const { paramCase } = require("param-case");
const { parse, serialize } = require("parse5");

const { findSourceByType, findSourcesByType } = require("./sources");

const toHTMLAttrs = attrs =>
  Object.keys(attrs).reduce((result, attr) => {
    result.push({
      name: paramCase(attr),
      value: attrs[attr]
    });

    return result;
  }, []);

const appendOrUpdateAttr = (node, name, value) => {
  const attrs = node.attrs.filter(attr => attr.name !== name);

  attrs.push({ name, value });

  node.attrs = attrs;
};

const appendTextNode = (parentNode, value) =>
  parentNode.childNodes.push({
    nodeName: "#text",
    value,
    parentNode
  });

const appendTitleTag = (parentNode, title) => {
  const titleTag = {
    attrs: [],
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "title",
    parentNode,
    tagName: "title"
  };

  appendTextNode(titleTag, title);

  parentNode.childNodes.push(titleTag);
};

const appendOrUpdateTitleTag = (parentNode, title) => {
  parentNode.childNodes = parentNode.childNodes.filter(
    ({ tagName }) => tagName !== "title"
  );

  appendTitleTag(parentNode, title);
};

const appendLinkTag = (parentNode, attrs) =>
  parentNode.childNodes.push({
    attrs: toHTMLAttrs(attrs),
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "link",
    parentNode,
    tagName: "link"
  });

const appendMetaTag = (parentNode, name, content) =>
  parentNode.childNodes.push({
    attrs: toHTMLAttrs({
      name,
      content
    }),
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "meta",
    parentNode,
    tagName: "meta"
  });

const sortNodes = nodes => {
  const groups = {
    links: [],
    styles: [],
    meta: [],
    scripts: [],
    title: undefined,
    other: []
  };

  for (const node of nodes) {
    switch (node.nodeName) {
      case "link": {
        if (node.rel === "stylesheet") {
          groups.styles.push(node);
        } else {
          groups.links.push(node);
        }

        break;
      }
      case "meta": {
        groups.meta.push(node);

        break;
      }
      case "script": {
        groups.scripts.push(node);

        break;
      }
      case "title": {
        groups.title = node;

        break;
      }
      default: {
        groups.other.push(node);
      }
    }
  }

  const sortedNodes = [...groups.meta];

  if (groups.title) {
    sortedNodes.push(groups.title);
  }

  sortedNodes.push(
    ...groups.links,
    ...groups.styles,
    ...groups.scripts,
    ...groups.other
  );

  return sortedNodes;
};

const injectToHTML = ({ html, manifest, sources }) => {
  const parsedHtml = parse(html);
  const document = parsedHtml.childNodes[1];
  const head = document.childNodes[0];

  const faviconSource = findSourceByType(sources, "favicon");

  if (faviconSource) {
    appendLinkTag(head, {
      href: faviconSource.href,
      rel: "icon"
    });
  }

  const manifestSource = findSourceByType(sources, "manifest");

  if (manifestSource) {
    appendLinkTag(head, {
      href: manifestSource.href,
      rel: "manifest"
    });
  }

  const icons = findSourcesByType(sources, "icon").filter(({ touch }) => touch);

  if (icons.length === 1) {
    const { href } = icons[0];

    appendLinkTag(head, {
      href,
      rel: "apple-touch-icon"
    });
  } else if (icons.length > 1) {
    for (const { href, icon } of icons) {
      appendLinkTag(head, {
        href,
        rel: "apple-touch-icon",
        sizes: icon.sizes
      });
    }
  }

  if (manifest.lang) {
    appendOrUpdateAttr(document, "lang", manifest.lang);
  }

  const name = manifest.name || manifest.shortName;

  if (name) {
    appendOrUpdateTitleTag(head, name);
  }

  if (manifest.description) {
    appendMetaTag(head, "description", manifest.description);
  }

  if (manifest.themeColor) {
    appendMetaTag(head, "theme-color", manifest.themeColor);
  }

  head.childNodes = sortNodes(head.childNodes);

  return serialize(parsedHtml);
};

module.exports = { injectToHTML };

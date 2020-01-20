const { readFile } = require("fs");
const mime = require("mime-types");
const { RawSource } = require("webpack-sources");
const { join } = require("path");
const { snakeCase } = require("snake-case");

const { mapKeys, toJSON } = require("../../../utils");

const sizeToDimensions = size => `${size}x${size}`;

const readToRawSource = file =>
  new Promise((resolve, reject) => {
    readFile(file, (error, data) =>
      error ? reject(error) : resolve(new RawSource(data))
    );
  });

const readFavicon = async ({ file, sizes }) => {
  const filename = "favicon.ico";
  const icon = {
    src: filename,
    sizes: sizes
      .sort((a, b) => (a > b ? -1 : 1))
      .map(sizeToDimensions)
      .join(" "),
    type: "image/x-icon"
  };
  const source = await readToRawSource(file);

  return { filename, icon, source, type: "favicon" };
};

const readIcons = icons =>
  Promise.all(
    icons.map(async ({ file, size, touch = false }) => {
      const type = mime.lookup(file);
      const extension = mime.extension(type);
      const filename = `logo${size}.${extension}`;

      const icon = {
        src: filename,
        sizes: sizeToDimensions(size),
        type
      };
      const source = await readToRawSource(file);

      return {
        filename,
        icon,
        source,
        type: "icon",
        touch
      };
    })
  );

const readImages = async (favicon, icons) => {
  const sources = [];

  if (favicon) {
    sources.push(await readFavicon(favicon));
  }

  if (icons && icons.length) {
    sources.push(...(await readIcons(icons)));
  }

  return sources;
};

const readSources = async ({
  beautify,
  favicon,
  icons,
  manifest,
  publicPath
}) => {
  const sources = await readImages(favicon, icons);
  const manifestData = mapKeys(manifest, snakeCase);

  const manifestIcons = sources.reduce((icons, { icon }) => {
    if (icon) {
      icons.push(icon);
    }

    return icons;
  }, []);

  if (manifestIcons.length > 0) {
    manifestData.icons = manifestIcons;
  }

  const manifestContent = toJSON(manifestData, beautify);

  sources.push({
    filename: "manifest.json",
    source: new RawSource(manifestContent),
    type: "manifest"
  });

  return sources.map(source => ({
    ...source,

    href: join(publicPath, source.filename)
  }));
};

const findSourceByType = (sources, type) =>
  sources.find(source => source.type === type);

const findSourcesByType = (sources, type) =>
  sources.filter(source => source.type === type);

module.exports = { findSourceByType, findSourcesByType, readSources };

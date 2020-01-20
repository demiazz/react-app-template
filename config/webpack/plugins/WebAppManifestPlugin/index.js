const { injectToHTML } = require("./html");
const { findHtmlPlugin } = require("./htmlPlugin");
const { readSources } = require("./sources");

module.exports = class WebAppManifestPlugin {
  constructor(options = {}) {
    const { beautify, favicon, icons, manifest } = options;

    this.beautify = Boolean(beautify);
    this.favicon = favicon;
    this.icons = icons;
    this.manifest = manifest;
  }

  findHtmlPlugin(compiler) {
    return compiler.options.plugins
      .map(({ constructor }) => constructor)
      .find(
        constructor => constructor && constructor.name === "HtmlWebpackPlugin"
      );
  }

  apply(compiler) {
    const sourcesPromise = readSources({
      beautify: this.beautify,
      favicon: this.favicon,
      icons: this.icons,
      manifest: this.manifest,
      publicPath: compiler.options.output.publicPath
    });

    compiler.hooks.make.tapPromise("web-app-manifest", async compilation => {
      const sources = await sourcesPromise;
      const htmlPlugin = findHtmlPlugin(compiler);

      htmlPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap("web-app-manifest", data => {
          const html = injectToHTML({
            html: data.html,
            manifest: this.manifest,
            sources
          });

          data.html = html;
        });
    });

    compiler.hooks.emit.tapPromise("web-app-manifest", async compilation => {
      const sources = await sourcesPromise;

      for (const { filename, source } of sources) {
        compilation.assets[filename] = source;
      }
    });
  }
};

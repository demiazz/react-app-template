const { capitalCase } = require("capital-case");
const HtmlPlugin = require("html-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");
const { join } = require("path");

const { WebAppManifestPlugin } = require("../plugins");
const { ensurePlugins } = require("./utils");

const minifyOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
};

module.exports = (
  config,
  {
    isProductionBuild,
    packageName,
    packageDescription,
    packageAuthorName,
    packageAuthorURL,
    iconsDir
  }
) => {
  const name = capitalCase(packageName);

  ensurePlugins(config).push(
    new HtmlPlugin({
      cache: !isProductionBuild,
      inject: "head",
      minify: isProductionBuild ? minifyOptions : false
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: "defer"
    }),
    new WebAppManifestPlugin({
      beautify: !isProductionBuild,
      favicon: {
        file: join(iconsDir, "favicon.ico"),
        sizes: [16, 24, 32, 64]
      },
      icons: [
        {
          file: join(iconsDir, "logo192.png"),
          size: 192,
          touch: true
        },
        {
          file: join(iconsDir, "logo512.png"),
          size: 512
        }
      ],
      manifest: {
        backgroundColor: "#ffffff",
        description: packageDescription,
        developer: {
          name: packageAuthorName,
          url: packageAuthorURL
        },
        display: "standalone",
        lang: "en",
        name: name,
        shortName: name,
        startUrl: ".",
        themeColor: "#000000"
      }
    })
  );
};

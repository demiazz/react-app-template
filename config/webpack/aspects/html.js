const {
  WebAppManifestPlugin
} = require("@react-dev-env/web-app-manifest-plugin/lib");
const { capitalCase } = require("capital-case");
const HtmlPlugin = require("html-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");
const { join } = require("path");

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
    new WebAppManifestPlugin(
      {
        appIcons: [
          {
            filePath: join(iconsDir, "logo192.png"),
            appleTouchIcon: true
          },
          {
            filePath: join(iconsDir, "logo512.png")
          }
        ],
        backgroundColor: "#ffffff",
        description: packageDescription,
        developer: {
          name: packageAuthorName,
          url: packageAuthorURL
        },
        display: "standalone",
        favIcon: join(iconsDir, "favicon.ico"),
        lang: "en",
        name: name,
        shortName: name,
        startUrl: ".",
        themeColor: "#000000"
      },
      {
        beautify: !isProductionBuild
      }
    )
  );
};

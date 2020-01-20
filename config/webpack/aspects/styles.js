const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TreatPlugin = require("treat/webpack-plugin");

const {
  css: cssLoader,
  cssModules: cssModulesLoader,
  postcss: postcssLoader,
  style: styleLoader
} = require("../loaders");
const { ensurePlugins, ensureRules } = require("./utils");

const cssPattern = /\.p?css$/;
const cssModulesPattern = /\.module\.p?css$/;

module.exports = (config, environment) => {
  // Use CSS extraction only in production build for better performance.
  const useCSSExtraction = environment.isProductionBuild;

  const environmentBoundedStyleLoader = useCSSExtraction
    ? MiniCSSExtractPlugin.loader
    : styleLoader();

  const plugins = ensurePlugins(config);
  const rules = ensureRules(config);

  rules.push({
    test: cssPattern,
    exclude: cssModulesPattern,
    use: [
      environmentBoundedStyleLoader,
      cssLoader(1, environment),
      postcssLoader(environment)
    ],
    sideEffects: true
  });

  rules.push({
    test: cssModulesPattern,
    use: [
      environmentBoundedStyleLoader,
      cssModulesLoader(1, environment),
      postcssLoader(environment)
    ]
  });

  // Configure `treat` package. This is CSS-in-JS solution with minimalistic (
  // near to zero) runtime. Learn more: https://seek-oss.github.io/treat/
  plugins.push(
    new TreatPlugin({
      outputLoaders: [environmentBoundedStyleLoader]
    })
  );

  if (useCSSExtraction) {
    plugins.push(
      new MiniCSSExtractPlugin({
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        filename: "static/css/[name].[contenthash:8].css"
      })
    );
  }
};

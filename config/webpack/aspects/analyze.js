const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { ensurePlugins } = require("./utils");

module.exports = (config, { isAnalyzeBuild }) => {
  if (!isAnalyzeBuild) {
    return;
  }

  ensurePlugins(config).push(new BundleAnalyzerPlugin());
};

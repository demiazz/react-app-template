const HtmlPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");

const {
  ensureCacheGroups,
  ensureOptimization,
  ensurePlugins,
  ensureRuntimeChunk,
  nodeModulesPattern
} = require("./utils");

module.exports = (config, { isProductionBuild }) => {
  if (!isProductionBuild) {
    return;
  }

  ensureOptimization(config).moduleIds = "hashed";

  ensureCacheGroups(config).vendor = {
    chunks: "all",
    test: nodeModulesPattern
  };

  ensureRuntimeChunk(config).name = ({ name }) => `runtime-${name}`;

  ensurePlugins(config).push(
    new InlineChunkHtmlPlugin(HtmlPlugin, [/runtime-.+[.]js/])
  );
};

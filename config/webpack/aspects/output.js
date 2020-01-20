const { ensureOutput, setProperties } = require("./utils");

module.exports = (
  config,
  { buildDir, isDevelopmentBuild, isProductionBuild }
) => {
  const filename = isProductionBuild
    ? "static/js/[name].[contenthash:8]"
    : "static/js/[name]";

  setProperties(ensureOutput(config), {
    filename: `${filename}.js`,
    chunkFilename: `${filename}.chunk.js`,
    path: buildDir,
    pathinfo: isDevelopmentBuild,
    publicPath: "/"
  });
};

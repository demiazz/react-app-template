module.exports = (config, { isProductionBuild }) => {
  config.devtool = isProductionBuild ? "source-map" : "cheap-module-source-map";
};

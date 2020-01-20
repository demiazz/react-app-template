module.exports = (config, { isProductionBuild }) => {
  config.mode = isProductionBuild ? "production" : "development";
};

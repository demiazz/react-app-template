module.exports = (config, { isProductionBuild }) => {
  // Should stop a production build if an error happened.
  config.bail = isProductionBuild;
};

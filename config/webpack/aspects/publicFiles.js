const CopyPlugin = require("copy-webpack-plugin");

const { ensurePlugins } = require("./utils");

module.exports = (config, environment) => {
  ensurePlugins(config).push(new CopyPlugin([environment.publicDir]));
};

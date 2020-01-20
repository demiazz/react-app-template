const { EnvironmentPlugin } = require("webpack");

const { ensurePlugins } = require("./utils");

module.exports = (config, { variables }) => {
  const variablesNames = Object.keys(variables);

  ensurePlugins(config).push(new EnvironmentPlugin(variablesNames));
};

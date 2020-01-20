const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const { ensurePlugins, nodeModulesPattern } = require("./utils");

module.exports = config => {
  ensurePlugins(config).push(
    // Useful for developer machines with case insensitive file system (usually
    // it's macOS).
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: nodeModulesPattern,
      failOnError: true
    })
  );
};

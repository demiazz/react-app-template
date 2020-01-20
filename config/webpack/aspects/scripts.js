const ForkTsCheckPlugin = require("fork-ts-checker-webpack-plugin");

const { javascript: javascriptLoader } = require("../loaders");
const {
  ensureExtensions,
  ensurePlugins,
  ensureRules,
  nodeModulesPattern
} = require("./utils");

const javascriptPattern = /\.jsx?$/;
const typescriptPattern = /\.tsx?$/;

module.exports = (config, environment) => {
  ensureRules(config).push(
    {
      test: javascriptPattern,
      exclude: nodeModulesPattern,
      use: [javascriptLoader(environment)]
    },
    {
      test: typescriptPattern,
      exclude: nodeModulesPattern,
      use: [javascriptLoader(environment)]
    }
  );

  const { isDevelopmentBuild, isDevelopmentServerEnabled } = environment;

  // Before production build we run TypeScript compiler.
  if (isDevelopmentBuild) {
    ensurePlugins(config).push(
      new ForkTsCheckPlugin({
        async: !isDevelopmentServerEnabled,
        checkSyntacticErrors: true,
        reportFiles: [
          "**",
          "!**/__tests__/**",
          "!**/?(*.)(spec|test).*",
          "!**/src/setupProxy.*",
          "!**/src/setupTests.*"
        ],
        silent: true,
        useTypescriptIncrementalApi: true
      })
    );
  }

  ensureExtensions(config).push(".ts", ".tsx", ".js", ".jsx");
};

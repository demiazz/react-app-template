const { BuildInfoPlugin } = require("@react-dev-env/build-info-plugin");
const { EnvironmentPlugin } = require("webpack");

const { ensurePlugins, toEnvironment } = require("./utils");

module.exports = (
  config,
  { branch, isDevelopmentBuild, nodeEnvironment, release, revision }
) => {
  const buildEnvironment = {
    branch,
    release,
    revision
  };
  const buildInfo = {
    ...buildEnvironment,

    nodeEnvironment
  };

  ensurePlugins(config).push(
    new BuildInfoPlugin({
      beautify: isDevelopmentBuild,
      buildInfo
    }),
    new EnvironmentPlugin(toEnvironment(buildEnvironment))
  );
};

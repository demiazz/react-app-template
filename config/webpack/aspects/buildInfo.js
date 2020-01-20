const { EnvironmentPlugin } = require("webpack");

const { BuildInfoPlugin } = require("../plugins");
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

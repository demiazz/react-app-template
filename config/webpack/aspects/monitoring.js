const SentryPlugin = require("@sentry/webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

const { CleanSourceMapsPlugin } = require("../plugins");
const { ensurePlugins } = require("./utils");

const requiredVariables = ["SENTRY_PROJECT", "SENTRY_ORG", "SENTRY_AUTH_TOKEN"];

const validateVariable = (name, value) => {
  if (value == null || value.length === 0) {
    throw new Error(
      `The ${JSON.stringify(name)} environment variable ` +
        "is required but was not specified"
    );
  }
};

const validateSentryEnvironment = (validateDSN = false) => {
  for (const name of requiredVariables) {
    const value = process.env[name];

    validateVariable(name, value);
  }

  if (validateDSN) {
    validateVariable("SENTRY_DSN", process.env.SENTRY_DSN);
  }
};

module.exports = (
  config,
  { buildDir, isProductionBuild, isCIBuild, release }
) => {
  if (!isProductionBuild) {
    return;
  }

  // Sending source maps to the Sentry runs in production environment.
  // But if it's not a CI environment then dry run used.
  const isMonitoringEnabled = isCIBuild;

  validateSentryEnvironment(isMonitoringEnabled);

  ensurePlugins(config).push(
    new SentryPlugin({
      dryRun: !isMonitoringEnabled,
      include: buildDir,
      // We must replace `/` because it's an invalid symbol for Sentry release.
      release: release.replace("/", "--"),
      urlPrefix: "~"
    }),
    new EnvironmentPlugin({
      monitoring: isMonitoringEnabled,
      dsn: process.env.SENTRY_DSN
    }),
    new CleanSourceMapsPlugin()
  );
};

const { constantCase } = require("constant-case");

const {
  rootDir,
  srcDir,
  buildDir,
  cacheDir,
  packagePath,
  nodeModulesDir,
  publicDir,
  iconsDir,
  tsConfigPath,

  entryPointFor,
  cacheDirFor
} = require("../../paths");
const {
  validateNodeEnvironment,
  checkBooleanEnvironmentVariable
} = require("../../utils");
const loadEnvironmentConfig = require("./loadEnvironmentConfig");
const git = require("./git");

const allowedEnvironments = ["production", "development"];

module.exports = async () => {
  const nodeEnvironment = process.env.NODE_ENV;

  // Validates existing of `NODE_ENV` environment variable.
  validateNodeEnvironment(allowedEnvironments, nodeEnvironment);

  // Loads environment variables from `.env` files.
  loadEnvironmentConfig(nodeEnvironment);

  // Fetches branch and revision from Git.
  const { branch, revision } = await git();

  // Checks existing of the development server.
  const isDevelopmentServerEnabled =
    process.argv[1].indexOf("webpack-dev-server") !== -1;

  // Extracts package information.
  const {
    name: packageName,
    description: packageDescription,
    author: { name: packageAuthorName, url: packageAuthorURL }
  } = require(packagePath);

  // Creates build's flags.
  const isProductionBuild = nodeEnvironment === "production";
  const isDevelopmentBuild = nodeEnvironment === "development";
  const isProfileBuild =
    isProductionBuild && checkBooleanEnvironmentVariable("PROFILE");
  const isCIBuild = checkBooleanEnvironmentVariable("CI");
  const isAnalyzeBuild = checkBooleanEnvironmentVariable("ANALYZE");

  // Extracts environment variables.
  //
  // This code extracts only "safe" variables. It's `NODE_ENV` and all variables
  // which starts with `PACKAGE_NAME_`.
  const variables = Object.keys(process.env).reduce((variables, variable) => {
    if (
      variable === "NODE_ENV" ||
      variable.startsWith(`${constantCase(packageName)}_`)
    ) {
      variables[variable] = process.env[variable];
    }

    return variables;
  }, {});

  // Creates a release tag.
  const release = [
    branch,
    revision,
    nodeEnvironment,
    isProfileBuild ? "profile" : undefined
  ]
    .filter(part => part != null)
    .join("-");

  return Object.freeze({
    nodeEnvironment,

    branch,
    revision,

    rootDir,
    srcDir,
    buildDir,
    cacheDir,
    packagePath,
    nodeModulesDir,
    publicDir,
    iconsDir,
    tsConfigPath,

    entryPointFor,
    cacheDirFor,

    isDevelopmentServerEnabled,

    packageName,
    packageDescription,
    packageAuthorName,
    packageAuthorURL,

    isProductionBuild,
    isDevelopmentBuild,
    isProfileBuild,
    isCIBuild,
    isAnalyzeBuild,

    variables,

    release
  });
};

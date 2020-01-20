const { constantCase } = require("constant-case");

const nodeModulesPattern = /[\\/]node_modules[\\/]/;

const get = (object, path, defaultValue) => {
  const properties = path.split(".");

  return properties.reduce((context, property, index) => {
    const isLastProperty = index === properties.length - 1;
    const propertyDefaultValue = isLastProperty ? defaultValue : {};

    context[property] =
      context[property] == null ? propertyDefaultValue : context[property];

    return context[property];
  }, object);
};

const ensure = (path, defaultValue = {}) => object =>
  get(object, path, defaultValue);

const ensureAlias = ensure("resolve.alias");

const ensureCacheGroups = ensure("optimization.splitChunks.cacheGroups");

const ensureDevServer = ensure("devServer");

const ensureEntry = ensure("entry");

const ensureExtensions = ensure("resolve.extensions", []);

const ensureMinimizer = ensure("optimization.minimizer", []);

const ensureModule = ensure("module");

const ensureOptimization = ensure("optimization");

const ensureOutput = ensure("output");

const ensurePlugins = ensure("plugins", []);

const ensureResolve = ensure("resolve");

const ensureRules = ensure("module.rules", []);

const ensureRuntimeChunk = ensure("optimization.runtimeChunk");

const setProperties = (object, properties) => {
  const names = Object.keys(properties);

  for (const name of names) {
    object[name] = properties[name];
  }

  return object;
};

const toEnvironment = variables =>
  Object.keys(variables).reduce((environment, key) => {
    const variable = constantCase(key);

    environment[variable] = variables[key];

    return environment;
  }, {});

module.exports = {
  ensureAlias,
  ensureCacheGroups,
  ensureDevServer,
  ensureEntry,
  ensureExtensions,
  ensureMinimizer,
  ensureModule,
  ensureOptimization,
  ensureOutput,
  ensurePlugins,
  ensureResolve,
  ensureRules,
  ensureRuntimeChunk,
  nodeModulesPattern,
  setProperties,
  toEnvironment
};

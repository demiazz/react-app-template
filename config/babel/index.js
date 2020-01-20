const { setDefaultNodeEnvironment } = require("../utils");
const createEnvironment = require("./createEnvironment");
const createConfig = require("./createConfig");

setDefaultNodeEnvironment();

module.exports = api => {
  api.cache(() => process.env.NODE_ENV);

  const environment = createEnvironment(process.env.NODE_ENV);

  return createConfig(environment);
};

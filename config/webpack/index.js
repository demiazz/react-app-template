const { setDefaultNodeEnvironment } = require("../utils");
const createEnvironment = require("./environment");
const { applyAspectsTo, aspects } = require("./aspects");

setDefaultNodeEnvironment();

module.exports = async () =>
  applyAspectsTo({}, await createEnvironment(), aspects);

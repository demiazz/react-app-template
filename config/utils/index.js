const nodeEnvironment = require("./nodeEnvironment");
const misc = require("./misc");
const tsAliases = require("./tsAliases");

module.exports = {
  ...nodeEnvironment,
  ...misc,
  ...tsAliases
};

const { ensureModule, ensureRules, setProperties } = require("./utils");

module.exports = config => {
  setProperties(ensureModule(config), {
    strictExportPresence: true
  });

  // Disables `require.ensure` because isn't standard feature of the language.
  ensureRules(config).unshift({
    parser: {
      requireEnsure: false
    }
  });
};

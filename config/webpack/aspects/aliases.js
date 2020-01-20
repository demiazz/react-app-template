const { aliasesFromTS } = require("../../utils");
const { ensureAlias, setProperties } = require("./utils");

module.exports = (
  config,
  { isDevelopmentBuild, isProfileBuild, tsConfigPath }
) => {
  const alias = ensureAlias(config);

  if (isProfileBuild) {
    // Use special versions of libraries for profiling purposes.
    setProperties(alias, {
      "react-dom$": "react-dom/profiling",
      "scheduler/tracing": "scheduler/tracing-profiling"
    });
  } else if (isDevelopmentBuild) {
    setProperties(alias, {
      "react-dom": "@hot-loader/react-dom"
    });
  }

  setProperties(alias, aliasesFromTS(tsConfigPath));
};

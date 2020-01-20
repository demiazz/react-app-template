const { cssLoaderOptions } = require("./utils");

module.exports = (importLoaders, environment) => ({
  loader: require.resolve("css-loader"),
  options: {
    ...cssLoaderOptions(importLoaders, environment),

    // Exports class names in `camelCase` style only. It's usable for code and
    // generates modules of less size.
    localsConvention: "camelCaseOnly",
    // Enables CSS modules support.
    modules: true
  }
});

const { cssLoaderOptions } = require("./utils");

module.exports = (importLoaders, environment) => ({
  loader: require.resolve("css-loader"),
  options: cssLoaderOptions(importLoaders, environment)
});

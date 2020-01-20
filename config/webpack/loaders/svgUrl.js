const { urlLoaderOptions } = require("./utils");

module.exports = environment => ({
  loader: require.resolve("svg-url-loader"),
  options: urlLoaderOptions(environment)
});

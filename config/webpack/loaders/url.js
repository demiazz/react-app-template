const { urlLoaderOptions } = require("./utils");

module.exports = environment => ({
  loader: require.resolve("url-loader"),
  options: urlLoaderOptions(environment)
});

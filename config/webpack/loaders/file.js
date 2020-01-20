const { fileLoaderOptions } = require("./utils");

module.exports = environment => ({
  loader: require.resolve("file-loader"),
  options: fileLoaderOptions(environment)
});

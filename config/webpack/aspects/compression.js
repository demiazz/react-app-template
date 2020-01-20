const zopfli = require("@gfx/zopfli");
const CompressionPlugin = require("compression-webpack-plugin");

const { ensurePlugins } = require("./utils");

module.exports = (config, { cacheDirFor, isProductionBuild }) => {
  if (!isProductionBuild) {
    return;
  }

  const plugins = ensurePlugins(config);

  plugins.push(
    // Use `zopfli` instead of classic `gzip` for better compression.
    new CompressionPlugin({
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
      cache: cacheDirFor("zopfli"),
      compressionOptions: {
        numiterations: 15
      }
    })
  );

  // If `brotli` if available, then use it too.
  if ("brotli" in process.versions) {
    plugins.push(
      new CompressionPlugin({
        algorithm: "brotliCompress",
        cache: cacheDirFor("brotli"),
        filename: "[path].br[query]"
      })
    );
  }
};

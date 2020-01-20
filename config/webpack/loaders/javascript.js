module.exports = ({ cacheDirFor, isDevelopmentBuild }) => ({
  loader: require.resolve("babel-loader"),
  options: {
    // We should not use the cache feature for production build because we can
    // have problems when will run production build after development build in
    // reasons of debugging.
    cacheDirectory: isDevelopmentBuild ? cacheDirFor("javascript") : false,
    // We do not have any advantages from cache compression in the development
    // environment because the cache is a lot of small files, which represents
    // small modules.
    cacheCompression: false
  }
});

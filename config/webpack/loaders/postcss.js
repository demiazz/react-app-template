module.exports = ({ isProductionBuild }) => ({
  loader: require.resolve("postcss-loader"),
  options: {
    ident: "postcss",
    sourceMap: isProductionBuild
  }
});

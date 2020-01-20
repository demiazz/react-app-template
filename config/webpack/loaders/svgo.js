module.exports = () => ({
  loader: require.resolve("svgo-loader"),
  options: {
    plugins: [
      {
        removeTitle: true
      },
      {
        convertColors: {
          shorthex: false
        }
      },
      {
        convertPathData: false
      }
    ]
  }
});

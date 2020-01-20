const findHtmlPlugin = compiler =>
  compiler.options.plugins
    .map(({ constructor }) => constructor)
    .find(
      constructor => constructor && constructor.name === "HtmlWebpackPlugin"
    );

module.exports = { findHtmlPlugin };

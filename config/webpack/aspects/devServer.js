const { checkBooleanEnvironmentVariable } = require("../../utils");

const { ensureDevServer, setProperties } = require("./utils");

module.exports = (config, { buildDir, isDevelopmentServerEnabled }) => {
  if (!isDevelopmentServerEnabled) {
    return;
  }

  setProperties(ensureDevServer(config), {
    clientLogLevel: "none",
    compress: true,
    contentBase: buildDir,
    historyApiFallback: true,
    host: process.env.WEBPACK_DEV_SERVER_HOST || "localhost",
    hot: true,
    https: checkBooleanEnvironmentVariable("WEBPACK_DEV_SERVER_HTTPS"),
    injectClient: true,
    injectHot: true,
    overlay: true,
    port: parseInt(process.env.WEBPACK_DEV_SERVER_PORT) || 8080,
    quiet: true,
    transportMode: "ws"
  });
};

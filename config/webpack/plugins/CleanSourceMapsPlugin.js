const { join } = require("path");
const rimraf = require("rimraf");

module.exports = class CleanSourceMapsPlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync(
      "clean-source-maps-plugin",
      async (_, callback) => {
        const buildDir = compiler.options.output.path;

        rimraf(join(buildDir, "**/*.@(js|css).map?(.br|.gz)"), callback);
      }
    );
  }
};

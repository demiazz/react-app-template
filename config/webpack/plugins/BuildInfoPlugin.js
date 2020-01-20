module.exports = class BuildInfoPlugin {
  constructor(options = {}) {
    this.beautify = Boolean(options.beautify);
    this.output = options.output || "build-info.json";
    this.buildInfo = options.buildInfo || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tap("build-info", compilation => {
      const buildInfo = JSON.stringify(
        this.buildInfo,
        null,
        this.beautify ? 2 : null
      );

      compilation.assets[this.output] = {
        source() {
          return buildInfo;
        },

        size() {
          return buildInfo.length;
        }
      };
    });
  }
};

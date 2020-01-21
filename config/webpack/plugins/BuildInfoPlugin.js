const { RawSource } = require("webpack-sources");

module.exports = class BuildInfoPlugin {
  constructor({
    beautify = false,
    buildInfo = {},
    fileName = "build-info.json"
  } = {}) {
    this.beautify = beautify;
    this.fileName = fileName;
    this.buildInfo = buildInfo;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("build-info", compilation => {
      compilation.assets[this.fileName] = this.createAsset();
    });
  }

  createAsset() {
    const json = JSON.stringify(this.buildInfo, null, this.beautify ? 2 : 0);

    return new RawSource(json);
  }
};

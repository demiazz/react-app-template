const { relative } = require("path");

const { rootDir } = require("../../paths");

module.exports = {
  process(src, filename) {
    const mock = relative(rootDir, filename);

    return `module.exports = ${JSON.stringify(mock)};`;
  }
};

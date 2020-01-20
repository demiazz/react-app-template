const { applyAspectsTo } = require("./applyAspectsTo");

const aliases = require("./aliases");
const analyze = require("./analyze");
const buildInfo = require("./buildInfo");
const compression = require("./compression");
const devServer = require("./devServer");
const entry = require("./entry");
const environment = require("./environment");
const html = require("./html");
const minification = require("./minification");
const monitoring = require("./monitoring");
const misc = require("./misc");
const mode = require("./mode");
const modules = require("./modules");
const output = require("./output");
const publicFiles = require("./publicFiles");
const resources = require("./resources");
const scripts = require("./scripts");
const sourceMaps = require("./sourceMaps");
const splitting = require("./splitting");
const styles = require("./styles");
const validation = require("./validation");

const aspects = [
  aliases,
  analyze,
  buildInfo,
  compression,
  devServer,
  entry,
  environment,
  html,
  minification,
  monitoring,
  misc,
  mode,
  modules,
  output,
  publicFiles,
  resources,
  scripts,
  sourceMaps,
  splitting,
  styles,
  validation
];

module.exports = {
  applyAspectsTo,
  aspects
};

const { join, resolve } = require("path");

const rootDir = resolve(__dirname, "../");

const configDir = join(rootDir, "config");
const iconsDir = join(rootDir, "icons");
const publicDir = join(rootDir, "public");
const srcDir = join(rootDir, "src");

const cacheDir = join(rootDir, ".cache");
const buildDir = join(rootDir, "build");

const nodeModulesDir = join(rootDir, "node_modules");

const packagePath = join(rootDir, "package.json");
const tsConfigPath = join(configDir, "tsconfig.json");

const entryPointFor = entity => join(srcDir, entity);
const cacheDirFor = entity => join(cacheDir, entity);

module.exports = {
  rootDir,

  configDir,
  iconsDir,
  publicDir,
  srcDir,

  cacheDir,
  buildDir,

  nodeModulesDir,

  packagePath,
  tsConfigPath,

  entryPointFor,
  cacheDirFor
};

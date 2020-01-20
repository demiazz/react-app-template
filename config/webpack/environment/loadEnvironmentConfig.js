const { config: loadConfig } = require("dotenv");
const expand = require("dotenv-expand");
const { existsSync } = require("fs");

module.exports = nodeEnvironment => {
  const paths = [
    `.env.${nodeEnvironment}.local`,
    `.env.${nodeEnvironment}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone.
    nodeEnvironment !== "test" ? ".env.local" : undefined,
    ".env"
  ].filter(path => path != null);

  for (const path of paths) {
    if (existsSync(path)) {
      expand(loadConfig({ path }));
    }
  }
};

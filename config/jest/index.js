const { relative } = require("path");

const { cacheDirFor, rootDir, tsConfigPath } = require("../paths");
const { aliasesFromTS } = require("../utils");

const jestAliases = tsConfigPath => {
  const aliases = aliasesFromTS(tsConfigPath);

  return Object.keys(aliases).reduce((result, alias) => {
    const name = `^${alias}(.*)$`;
    const path = `<rootDir>/${relative(rootDir, aliases[alias])}$1`;

    result[name] = path;

    return result;
  }, {});
};

module.exports = {
  cacheDirectory: cacheDirFor("jest"),
  clearMocks: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    // Emulate CSS modules behaviour in Webpack.
    // CSS Modules returns object with class names.
    "^.+\\.module\\.p?css$": require.resolve("identity-obj-proxy"),

    ...jestAliases(tsConfigPath)
  },
  rootDir,
  setupFiles: [require.resolve("react-app-polyfill/jsdom")],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("babel-jest"),
    // Any CSS returns empty object.
    "^.+\\.p?css$": "<rootDir>/config/jest/transforms/css.js",
    // Any non JS/CSS returns string with relative path.
    "^(?!.*\\.(js|jsx|ts|tsx|css|pcss)$)":
      "<rootDir>/config/jest/transforms/file.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|json)$",
    "^.+\\.module\\.p?css$"
  ],
  // Jest uses JSDom 11 by default to support NodeJS 6.x and above.
  // This environment uses JSDom 14 to support NodeJS 8.x and above.
  testEnvironment: "jest-environment-jsdom-fourteen",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};

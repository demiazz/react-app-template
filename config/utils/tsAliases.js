const { dirname, resolve } = require("path");

const { mapValues } = require("./misc");

const aliasName = alias => {
  const exactMatch = alias.match(/^(@@[a-zA-Z-]+)$/);

  if (exactMatch && exactMatch[1]) {
    return { name: exactMatch[1], type: "exact" };
  }

  const wildcardMatch = alias.match(/^(@@[a-zA-Z-]+)\/\*$/);

  if (wildcardMatch && wildcardMatch[1]) {
    return { name: wildcardMatch[1], type: "wildcard" };
  }

  throw new Error(
    `The TypeScript's alias ${JSON.stringify(alias)} have wrong format. ` +
      'Right format is "@@<alias>" and "@@<alias>/*".'
  );
};

const validateAliasPaths = (alias, paths) => {
  if (paths.length === 0) {
    throw new Error(
      `The TypeScript's alias ${JSON.stringify(alias)} have no search path.`
    );
  }

  if (paths.length > 1) {
    throw new Error(
      `The TypeScript's alias ${JSON.stringify(alias)} ` +
        "must have the only one search path."
    );
  }
};

const exactAliasPath = (alias, paths) => {
  validateAliasPaths(alias, paths);

  const match = paths[0].match(/^((\.|\.\.|[a-zA-Z-]+)(\/[a-zA-Z-]+)*)\/?$/);

  if (match && match[1]) {
    return match[1];
  }

  throw new Error(
    `The TypeScript's alias ${JSON.stringify(alias)} ` +
      `have an invalid path ${JSON.stringify(paths[0])}. ` +
      'Alias path must have format "[./|../]<path>[/]".'
  );
};

const wildcardAliasPath = (alias, paths) => {
  validateAliasPaths(alias, paths);

  const match = paths[0].match(/^((\.|\.\.|[a-zA-Z-]+)(\/[a-zA-Z-]+)*)\/\*$/);

  if (match && match[1]) {
    return match[1];
  }

  throw new Error(
    `The TypeScript's alias ${JSON.stringify(alias)} ` +
      `have an invalid path ${JSON.stringify(paths[0])}. ` +
      'Alias path must have format "[./|../]<path>/*".'
  );
};

const parseAlias = (alias, paths) => {
  const { name, type } = aliasName(alias);
  const path =
    type === "exact"
      ? exactAliasPath(alias, paths)
      : wildcardAliasPath(alias, paths);

  return { name, path, type };
};

const validateParsedAliases = aliases => {
  for (const name of Object.keys(aliases)) {
    const { exact, wildcard } = aliases[name];

    if (!exact) {
      throw new Error(`The TypeScript's alias "${name}" must be defined.`);
    }

    if (!wildcard) {
      throw new Error(`The TypeScript's alias "${name}/* must be defined.`);
    }

    if (exact !== wildcard) {
      throw new Error(
        `The paths for "${name}" and "${name}/*" aliases ` +
          "must point to the same path."
      );
    }
  }
};

const plainifyAliases = aliases => mapValues(aliases, ({ exact }) => exact);

const parseAliases = aliases => {
  const parsed = {};

  for (const alias of Object.keys(aliases)) {
    const paths = aliases[alias];

    const { name, path, type } = parseAlias(alias, paths);

    if (!parsed[name]) {
      parsed[name] = {};
    }

    parsed[name][type] = path;
  }

  validateParsedAliases(parsed);

  return plainifyAliases(parsed);
};

const aliasesFromTS = tsConfigPath => {
  const {
    compilerOptions: { paths }
  } = require(tsConfigPath);
  const context = dirname(tsConfigPath);

  return mapValues(parseAliases(paths), path => resolve(context, path));
};

module.exports = {
  aliasesFromTS
};

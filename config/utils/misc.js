const mapKeys = (object, fn) =>
  Object.keys(object).reduce((result, key) => {
    result[fn(key)] = object[key];

    return result;
  }, {});

const mapValues = (object, fn) =>
  Object.keys(object).reduce((result, key) => {
    result[key] = fn(object[key]);

    return result;
  }, {});

const toJSON = (object, beautify = false) =>
  JSON.stringify(object, null, beautify ? 2 : null);

const checkBooleanEnvironmentVariable = variable => {
  const value = process.env[variable];

  return value === "1" || value === "true";
};

module.exports = {
  mapKeys,
  mapValues,
  toJSON,
  checkBooleanEnvironmentVariable
};

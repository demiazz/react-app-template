const { validateNodeEnvironment } = require("../utils");

const allowedEnvironments = ["production", "development", "test"];

module.exports = nodeEnvironment => {
  validateNodeEnvironment(allowedEnvironments, nodeEnvironment);

  const isProduction = nodeEnvironment === "production";
  const isDevelopment = nodeEnvironment === "development";
  const isTest = nodeEnvironment === "test";

  return Object.freeze({
    isProduction,
    isDevelopment,
    isTest
  });
};

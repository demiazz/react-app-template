const applyAspectsTo = (config, environment, aspects) => {
  for (const aspect of aspects) {
    aspect(config, environment);
  }

  return config;
};

module.exports = { applyAspectsTo };

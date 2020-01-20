const { ensureEntry, setProperties } = require("./utils");

const applyReactHotLoader = entries => {
  const patch = "react-hot-loader/patch";

  return Object.keys(entries).reduce((nextEntries, entry) => {
    const modules = entries[entry];

    nextEntries[entry] = Array.isArray(modules)
      ? [patch, ...modules]
      : [patch, modules];

    return nextEntries;
  }, {});
};

module.exports = (config, { entryPointFor, isDevelopmentBuild }) => {
  const entryPoints = {
    main: entryPointFor("index.tsx")
  };

  setProperties(
    ensureEntry(config),
    // Requires `react-hot-loader/patch` before React in the development mode.
    isDevelopmentBuild ? applyReactHotLoader(entryPoints) : entryPoints
  );
};

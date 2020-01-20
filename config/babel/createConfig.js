module.exports = ({ isProduction, isDevelopment, isTest }) => {
  const presetEnvOptions = isTest
    ? {
        modules: "cjs",
        targets: {
          node: "current"
        }
      }
    : {
        corejs: 3,
        exclude: ["transform-typeof-symbol"],
        forceAllTransforms: false,
        modules: false,
        useBuiltIns: "usage"
      };
  const presetReactOptions = {
    development: !isProduction,
    useBuiltIns: true
  };

  const config = {
    plugins: [
      require.resolve("babel-plugin-macros"),
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        {
          loose: true
        }
      ],
      [
        require.resolve("@babel/plugin-transform-runtime"),
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          // Don't use ES modules for running tests on the NodeJS.
          useESModules: !isTest
        }
      ]
    ],
    presets: [
      require.resolve("@babel/preset-typescript"),
      [require.resolve("@babel/preset-env"), presetEnvOptions],
      [require.resolve("@babel/preset-react"), presetReactOptions]
    ]
  };

  if (!isProduction) {
    // Improve debugging experience for the `treat`.
    config.plugins.push(require.resolve("babel-plugin-treat"));
  }

  if (isDevelopment) {
    config.plugins.push(require.resolve("react-hot-loader/babel"));
  }

  if (isTest) {
    // Adds support of async `import` to the NodeJS.
    config.plugins.push(require.resolve("babel-plugin-dynamic-import-node"));
  }

  return config;
};

const {
  file: fileLoader,
  svgUrl: svgUrlLoader,
  svgo: svgoLoader,
  url: urlLoader
} = require("../loaders");
const { ensureRules } = require("./utils");

const vectorImagesPattern = /\.svg$/;
const rasterImagesPattern = /\.(gif|jpe?g|png)$/;
const modernFontsPattern = /\.woff2$/;
const legacyFontsPattern = /\.(otf|ttf|woff)$/;

module.exports = (config, environment) => {
  const rules = ensureRules(config);
  const svgLoaders = [svgUrlLoader(environment)];

  if (environment.isProductionBuild) {
    svgLoaders.push(svgoLoader());
  }

  rules.push(
    {
      test: vectorImagesPattern,
      use: svgLoaders
    },
    {
      test: rasterImagesPattern,
      use: [urlLoader(environment)]
    },
    {
      test: modernFontsPattern,
      use: [urlLoader(environment)]
    },
    {
      test: legacyFontsPattern,
      use: [fileLoader(environment)]
    }
  );
};

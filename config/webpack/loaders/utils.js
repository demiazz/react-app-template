const cssLoaderOptions = (importLoaders, { isProductionBuild }) => ({
  esModule: true,
  // How many other loaders before this?
  importLoaders,
  sourceMap: isProductionBuild
});

const fileLoaderOptions = ({ isProductionBuild, srcDir }) => {
  const filename = "static/media/[path][name]";
  return {
    context: srcDir,
    name: isProductionBuild
      ? `${filename}.[contenthash:8].[ext]`
      : `${filename}.[ext]`
  };
};

const urlLoaderOptions = environment => ({
  ...fileLoaderOptions(environment),

  limit: 8192
});

module.exports = { cssLoaderOptions, fileLoaderOptions, urlLoaderOptions };

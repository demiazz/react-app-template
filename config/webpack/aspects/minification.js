const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { ensureMinimizer, ensureOptimization } = require("./utils");

module.exports = (
  config,
  { cacheDirFor, isProductionBuild, isProfileBuild }
) => {
  if (!isProductionBuild) {
    return;
  }

  ensureOptimization(config).minimize = true;

  ensureMinimizer(config).push(
    new TerserPlugin({
      cache: cacheDirFor("terser"),
      extractComments: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        compress: {
          // This option can transform ES5 code the ES6+ code.
          ecma: 5,
          // Breaks a valid code. Learn more:
          // - https://github.com/facebook/create-react-app/issues/5250
          // - https://github.com/terser-js/terser/issues/120
          inline: 2,
          warnings: false
        },
        // Needed for profiling development tools.
        keep_classnames: isProfileBuild,
        keep_fnames: isProfileBuild,
        mangle: {
          safari10: true
        },
        output: {
          ascii_only: true,
          comments: false,
          // This option doesn't downgrade ES6+ code to the ES5 code.
          ecma: 5
        },
        parse: {
          ecma: 8
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: isProductionBuild
          ? {
              annotation: true,
              inline: false
            }
          : false
      }
    })
  );
};

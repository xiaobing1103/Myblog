const fs = require('node:fs');
module.exports = function bundleAnalysis() {
  return {
    name: 'bundle-analysis',
    configureWebpack(_config, isServer) {
      if (isServer) return {};
      return {plugins: [{apply(compiler) {
        compiler.hooks.done.tap('BundleReport', stats => {
          fs.mkdirSync('reports', {recursive: true});
          fs.writeFileSync('reports/bundle-stats.json', JSON.stringify(stats.toJson({all: false, ids: true, chunks: true, chunkModules: true, modules: true, nestedModules: true, dependentModules: true, orphanModules: true, groupModulesByCacheStatus: false})));
        });
      }}]};
    },
  };
};

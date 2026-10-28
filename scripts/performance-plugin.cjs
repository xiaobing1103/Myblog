const path = require('node:path');

module.exports = function performancePlugin() {
  return {
    name: 'performance-policy',
    configureWebpack() {
      return {resolve: {alias: {
        [require.resolve('@docusaurus/core/lib/client/prefetch.js')]: path.resolve(__dirname, '../src/client/prefetch-intent.js'),
      }}};
    },
  };
};

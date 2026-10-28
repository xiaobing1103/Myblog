const path = require('node:path');
module.exports = function deferPrism() {
  return {
    name: 'defer-prism',
    configureWebpack() {
      return {resolve: {alias: {
        [require.resolve('@docusaurus/theme-classic/lib/prism-include-languages.js')]: path.resolve(__dirname, '../src/client/prism-deferred.js'),
      }}};
    },
  };
};

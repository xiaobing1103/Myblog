const {themes} = require('prism-react-renderer');
const readableColors = {'#999988': '#626c76', '#36acaa': '#06776f', '#00a4db': '#006b95', '#e3116c': '#ba0a53'};
const lightCodeTheme = {...themes.github, styles: themes.github.styles.map(rule => ({...rule, style: {...rule.style, color: readableColors[rule.style.color] || rule.style.color}}))};
module.exports = async function () {
const {default: remarkImages} = await import('./scripts/remark-images.mjs');
return {
  title: '二姨的博客', tagline: '用代码探索，在实践中成长',
  url: 'https://xiaobing1103.github.io', baseUrl: '/Myblog/', trailingSlash: true,
  favicon: 'img/favicon.png', organizationName: 'xiaobing1103', projectName: 'Myblog',
  onBrokenLinks: 'throw',
  future: {faster: true, v4: {removeLegacyPostBuildHeadAttribute: true}},
  i18n: {defaultLocale: 'zh-Hans', locales: ['zh-Hans']},
  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    navbar: {title: '二姨的博客', logo: {alt: '二姨', src: 'img/logo.webp', width: 36, height: 36}, items: [
      {to: '/', label: '文章', position: 'right'},
      {to: '/docs/learning/', label: '学习中心', position: 'right'},
      {to: '/docs/java/', label: 'Java 学习室', position: 'right'},
      {to: '/docs/interview/', label: '面试题库', position: 'right'},
      {to: '/docs/resources/resources-intro', label: '资源', position: 'right'},
      {href: 'https://github.com/xiaobing1103', label: 'GitHub', position: 'right'},
    ]},
    footer: {style: 'dark', links: [
      {title: '探索', items: [{label: '文章归档', to: '/archive'}, {label: '全部分类', to: '/tags'}]},
      {title: '更多', items: [{label: 'GitHub', href: 'https://github.com/xiaobing1103'}, {label: '我的文档', href: 'https://xiaobing1103.github.io/Mydocs/'}]},
      {title: '订阅', items: [{label: 'RSS', href: 'https://xiaobing1103.github.io/Myblog/rss.xml'}]},
    ], copyright: `Copyright © ${new Date().getFullYear()} 二姨 · 用代码探索，在实践中成长<br/>京ICP备1008686号-3`},
    prism: {theme: lightCodeTheme, darkTheme: themes.vsDark, defaultLanguage: 'javascript', additionalLanguages: ['java']},
  },
  presets: [['classic', {
    docs: {remarkPlugins: [remarkImages], numberPrefixParser: false, sidebarPath: require.resolve('./sidebars.js'), editUrl: 'https://github.com/xiaobing1103/Myblog/edit/master/'},
    blog: false,
    theme: {customCss: require.resolve('./src/css/custom.css')}, sitemap: {changefreq: 'weekly', priority: 0.5},
    ...(process.env.GTAG_ID ? {gtag: {trackingID: process.env.GTAG_ID, anonymizeIP: true}} : {}),
  }]],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    [require.resolve('./scripts/blog-metadata.cjs'), {remarkPlugins: [remarkImages], routeBasePath: '/', blogSidebarTitle: '近期文章', postsPerPage: 9, feedOptions: {type: ['rss', 'atom'], title: '二姨的博客', description: '前端开发与个人成长'}}],
    require.resolve('./scripts/defer-prism.cjs'), require.resolve('./scripts/performance-plugin.cjs'),
    ...(process.env.ANALYZE ? [require.resolve('./scripts/bundle-analysis.cjs')] : []),
  ],
};
};

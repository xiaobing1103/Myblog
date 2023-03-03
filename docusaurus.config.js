const path = require('path')

module.exports = {
  title: '二姨的博客',
  tagline: '帮助你提升前端开发技能',
  titleDelimiter: '-',
  url: 'https://xiaobing1103.github.io/Myblog/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'xiaobing1103', // Usually your GitHub org/user name.
  projectName: 'Myblog', // Usually your repo name.
  stylesheets: ['https://fonts.font.im/css?family=Raleway:500,700'],
  themeConfig: {
    navbar: {
      title: '二姨的博客',
      logo: {
        alt: '二姨',
        src: 'img/logo.png',
        srcDark: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          label: '博客',
          position: 'right',
          items: [
            {
              label: '前端',
              to: 'tags/前端',
            },
            {
              label: '职业',
              to: 'tags/职业',
            },
            {
              label: '健康',
              to: 'tags/健康',
            },
          ],
        },
        /* {
          label: "视频",
          position: "right",
          to: "docs/videos/videos-intro",
        }, */
        {
          label: '小册',
          position: 'right',
          to: 'docs/xiaoce/xiaoce-intro',
        },
        {
          label: '面试',
          position: 'right',
          to: 'docs/fontendInterview/Interview-intro',
        },
        /* {
          label: "课程",
          position: "right",
          items: [
            {
              label: "React 即时通信 UI 开发实战",
              to: "docs/course/react-chat-ui/react-chat-ui",
            },
          ],
        }, */
        {
          label: '教程',
          position: 'right',
          items: [
            {
              label: 'CSS',
              to: 'docs/css/box-model/box-model',
            },
          ],
        },
        {
          label: 'pdf合集',
          position: 'right',
          to: 'docs/resources/resources-intro',
        },
        {
          href: 'https://xiaobing1103.github.io/Myblog/#/',
          label: '我的文档',
          position: 'right',
        },
        {
          href: 'https://github.com/xiaobing1103',
          label: 'GitHub',
          position: 'right',
        },
        // {
        //   href: "https://github.com/zxuqian/frontend-questions/issues",
        //   label: "提问",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Style Guide",
        //       to: "docs/doc1"
        //     },
        //     {
        //       label: "Second Doc",
        //       to: "docs/doc2"
        //     }
        //   ]
        // },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus"
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus"
        //     }
        //   ]
        // },
        {
          title: 'Social',
          items: [
            {
              label: '博客',
              to: '/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/xiaobing1103',
            },
            // {
            //   label: "Bilibili 哔哩哔哩",
            //   href: "#",
            // },
            // {
            //   label: "网易云课堂",
            //   href:
            //     "#",
            // },
            // {
            //   label: "腾讯课堂",
            //   href: "#",
            // },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              label: '二姨的文档',
              to: 'https://xiaobing1103.github.io/Mydocs/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 二姨 Built with Docusaurus.<p>京ICP备1008686号-3</p>`,
    },
    prism: {
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      defaultLanguage: 'javascript',
    },
    googleAnalytics: {
      trackingID: 'UA-118572241-1',
      anonymizeIP: true, // Should IPs be anonymized?
    },
    gtag: {
      trackingID: 'G-6PSESJX0BM',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/xiaobing1103',
        },
        blog: {
          path: './blog',
          routeBasePath: '/',
          blogSidebarTitle: '近期文章',
          feedOptions: {
            type: 'all',
            title: '二姨前端工程师',
            copyright: `Copyright © ${new Date().getFullYear()} 二姨  Built with Docusaurus.<p>京ICP备1008686号-3</p>`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'daily',
          priority: 0.5,
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    path.resolve(__dirname, './src/plugin/plugin-baidu-analytics'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    // path.resolve(__dirname, "./src/plugin/plugin-google-adsense"),
  ],
}

// theme :[
//   "@docusaurus/theme-live-codeblock"
// ],

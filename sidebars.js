/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  learning: ['learning/index',
    {type: 'link', label: '前端视频课程', href: '/docs/videos/'},
    {type: 'link', label: 'Java 后端学习室', href: '/docs/java/'},
    {type: 'link', label: '项目实战', href: '/docs/java/projects/library/'},
    {type: 'link', label: '前端面试题库', href: '/docs/interview/'},
    {type: 'link', label: '资源与下载', href: '/docs/resources/resources-intro/'},
  ],
  java: [
    'java/index', 'java/textbook/index',
    {type: 'category', label: '第一阶段 · 写出小程序', items: [
      'java/textbook/01-first-program', 'java/textbook/02-types', 'java/textbook/03-operators',
      'java/textbook/04-control-flow', 'java/textbook/05-methods', 'java/textbook/06-arrays-strings',
    ]},
    {type: 'category', label: '第二阶段 · 用对象组织业务', items: [
      'java/textbook/07-objects', 'java/textbook/08-interfaces', 'java/textbook/09-exceptions',
    ]},
    {type: 'category', label: '第三阶段 · 处理真实数据', items: [
      'java/textbook/10-collections', 'java/textbook/11-streams', 'java/textbook/12-files-values',
    ]},
    {type: 'category', label: '第四阶段 · 进入后端工程', items: [
      'java/textbook/13-maven', 'java/textbook/14-http', 'java/textbook/15-spring',
    ]},
    {type: 'category', label: '第五阶段 · 可靠地完成项目', items: [
      'java/textbook/16-database', 'java/textbook/17-testing', 'java/textbook/18-project',
    ]},
    {type: 'category', label: '项目实战 · 图书借阅管理台', items: [
      'java/projects/library/index', 'java/projects/library/01-setup', 'java/projects/library/02-schema',
      'java/projects/library/03-books', 'java/projects/library/04-borrow-return',
      'java/projects/library/05-frontend', 'java/projects/library/06-testing', 'java/projects/library/07-delivery',
    ]},
    {type: 'category', label: '开源教材 · Spring 官方源码', items: [
      'java/open-source/index', 'java/open-source/rest-service',
    ]},
    {type: 'category', label: '快速复习与原有实战', items: [
      'java/basics', 'java/control-flow', 'java/objects', 'java/collections', 'java/streams',
      'java/exceptions', 'java/spring-boot', 'java/database-testing',
    ]},
    'java/practice', 'java/resources',
  ],
  // samples: {
  //   // Features: ["mdx"],
  //   "React 基础示例": [],
  // },
  css_tutorials: {
    基础: ["css/box-model/box-model"],
  },
  xiaoce:{
    简介:["xiaoce/xiaoce-intro"],
    数据结构与算法:[
      "xiaoce/algorithm/01-algorithm/01-algorithm",
      "xiaoce/algorithm/02-algorithm/02-algorithm",
      "xiaoce/algorithm/03-algorithm/03-algorithm",
      "xiaoce/algorithm/04-algorithm/04-algorithm",
      "xiaoce/algorithm/05-algorithm/05-algorithm",
    ],
  },
  fontendInterview:{
    题库导读:['interview/index'],
    阿里第一期:['interview/ali-1/index', 'interview/ali-1/html-browser', 'interview/ali-1/css'],
    阿里第二期:['interview/ali-2/index', 'interview/ali-2/javascript', 'interview/ali-2/algorithms', 'interview/ali-2/network-node'],
    综合面试手册:['interview/handbook/index', 'interview/handbook/html-browser', 'interview/handbook/javascript', 'interview/handbook/framework-engineering'],
    面经与笔试:['interview/ant', 'interview/pdd', 'interview/written'],
    JS基础面试题:[
      "fontendInterview/Interview/01-Interview/01-Interview",
      "fontendInterview/Interview/02-Interview/02-Interview",
      "fontendInterview/Interview/03-Interview/03-Interview",
    ],
    原型与网络专题:[
      'fontendInterview/tolove/01-NInterview/01-NInterview',
      'fontendInterview/tolove/02-NInterview/02-NInterview',
    ],
    原文对照:['interview/sources/ali-1', 'interview/sources/ali-2', 'interview/sources/handbook', 'interview/sources/ant', 'interview/sources/pdd', 'interview/sources/written'],
    原面试入口:['fontendInterview/Interview-intro'],
  },
  videos: {
    简介: ["videos/videos-intro"],
    JavaScript: ["videos/js/01-event-loop/event-loop"],
    CSS: [
      "videos/css/01-grid-layout/grid-layout",
      "videos/css/02-flex-layout/flex-layout",
      "videos/css/03-5-tips-master-css/5-tips-master-css",
      "videos/css/04-selectors/css-selectors",
      "videos/css/05-position/css-position",
    ],
    HTML: ["videos/html/01-html-basics/html-basics"],
    特效: ["videos/effects/01-glassmorphism/effects-glassmorphism"],
    浏览器: [
      "videos/browser/01-dom/what-is-dom",
      "videos/browser/02-bom/what-is-bom",
      "videos/browser/03-js-dom/js-dom-operation",
    ],
    网络: [
      "videos/network/01-http-basics/http-basics",
      "videos/network/02-https-basics/https-basics",
    ],
    React: [
      "videos/react/01-react-props-buttons/react-props-button",
      "videos/react/02-gradient-bg-react-state-event/react-state-event-gradient",
      "videos/react/03-5-react-spring-animations/5-react-spring-animations",
    ],
    TypeScript: ["videos/ts/01-intro/ts-intro"],
  },
  resources: {
    资源分类: ["resources/resources-intro"],
    PDF教材: [
      "resources/frontend-pdf/01frontend-pdf/01frontend-pdf",
      "resources/frontend-pdf/08frontend-pdf/08frontend-pdf",
    ],
    已转为Markdown的面试资料: [
      "resources/frontend-pdf/02frontend-pdf/02frontend-pdf",
      "resources/frontend-pdf/03frontend-pdf/03frontend-pdf",
      "resources/frontend-pdf/04frontend-pdf/04frontend-pdf",
      "resources/frontend-pdf/05frontend-pdf/05frontend-pdf",
      "resources/frontend-pdf/06frontend-pdf/06frontend-pdf",
      "resources/frontend-pdf/07frontend-pdf/07frontend-pdf",
    ],
    缺失文件说明: [
      "resources/frontend-pdf/10frontend-pdf/10frontend-pdf",
      "resources/frontend-pdf/11frontend-pdf/11frontend-pdf",
    ],
  },
};

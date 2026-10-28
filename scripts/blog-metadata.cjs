const {default: officialBlog, validateOptions} = require('@docusaurus/plugin-content-blog');

// 复用官方内容处理和文章路由，仅把自定义列表所需数据改为元信息。
module.exports = async function metadataBlog(context, options) {
  const plugin = await officialBlog(context, options);
  const contentLoaded = plugin.contentLoaded;
  return {...plugin, async contentLoaded(args) {
    const metadataBySource = new Map(args.content.blogPosts.map(post => [post.metadata.source, post.metadata]));
    await contentLoaded({...args, actions: {...args.actions, addRoute(route) {
      if ([options.blogListComponent, options.blogTagsPostsComponent].includes(route.component)) {
        const items = route.modules.items.map(item => {
          const metadata = metadataBySource.get(item.content.path);
          if (!metadata) throw new Error(`Missing blog metadata: ${item.content.path}`);
          const {title, description, date, permalink, tags, readingTime} = metadata;
          return {metadata: {title, description, date, permalink, tags: tags.map(({label, permalink}) => ({label, permalink})), readingTime}};
        });
        const {items: _items, sidebar: _sidebar, ...modules} = route.modules;
        args.actions.addRoute({...route, modules, props: {...route.props, items}});
      } else if (route.component === options.blogArchiveComponent) {
        const blogPosts = route.props.archive.blogPosts.map(({metadata: {title, date, permalink}}) => ({metadata: {title, date, permalink}}));
        args.actions.addRoute({...route, props: {...route.props, archive: {blogPosts}}});
      } else args.actions.addRoute(route);
    }}});
  }};
};
module.exports.validateOptions = validateOptions;

import React from 'react';
import BlogListPage from '@theme/BlogListPage';

export default function BlogTagsPostsPage({tag, listMetadata, items}) {
  return <BlogListPage
    metadata={listMetadata}
    items={items}
    title={`${tag.label} · 相关文章`}
    description={tag.description || `浏览「${tag.label}」分类下的文章。`}
    noIndex={tag.unlisted}
  />;
}

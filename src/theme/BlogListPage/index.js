import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BlogListPaginator from '@theme/BlogListPaginator';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function BlogListPage({metadata, items, title, description, noIndex}) {
  const firstPage = !title && metadata.page === 1;
  const illustration = useBaseUrl('/img/hero_main.min.svg');
  const ListHeading = title ? 'h1' : 'h2';
  return (
    <Layout title={title || (firstPage ? '编程、思考与成长' : `文章 · 第 ${metadata.page} 页`)} description={description || '分享前端开发、React、CSS、JavaScript，以及职业成长的实践与思考。'} noIndex={noIndex}>
      <main id="main-content" className="home-shell container">
        {firstPage && (
          <section className="home-intro" aria-labelledby="home-title">
            <div>
              <p className="eyebrow">二姨的博客 / FRONTEND & LIFE</p>
              <h1 id="home-title">用代码探索，<br />在实践中成长。</h1>
              <p className="home-description">记录前端开发的知识与经验，分享编程、职业和生活中的思考。把复杂的概念讲清楚，把学到的知识用起来。</p>
              <div className="home-actions">
                <a className="button button--primary" href="#latest">阅读最新文章 ↓</a>
                <Link className="button button--secondary" to="/docs/xiaoce/xiaoce-intro">探索学习小册</Link>
              </div>
            </div>
            <img src={illustration} width="640" height="480" alt="" fetchPriority="high" className="home-illustration" />
          </section>
        )}
        <section id="latest" aria-labelledby="latest-title">
          <div className="section-heading">
            <div><p className="eyebrow">持续学习 / KEEP LEARNING</p><ListHeading id="latest-title">{title || (firstPage ? '最新文章' : '文章归档')}</ListHeading></div>
            <Link to="/tags">浏览全部分类 →</Link>
          </div>
          <div className="post-grid">
            {items.map(({metadata: post}) => {
              const {title, description, date, permalink, tags, readingTime} = post;
              return <article className="post-card" key={permalink}>
                <div className="post-meta"><time dateTime={date}>{date.slice(0, 10)}</time><span>{Math.max(1, Math.ceil(readingTime))} 分钟阅读</span></div>
                <h3><Link to={permalink}>{title}</Link></h3>
                <p>{description}</p>
                <div className="card-tags">{tags.map(tag => <Link key={tag.permalink} to={tag.permalink}>{tag.label}</Link>)}</div>
                <Link className="card-read" to={permalink} aria-label={`阅读：${title}`}>阅读全文 ↗</Link>
              </article>;
            })}
          </div>
          <BlogListPaginator metadata={metadata} />
        </section>
      </main>
    </Layout>
  );
}

import React from 'react';
import Tag from '@theme/Tag';

// 显式使用码点顺序，避免服务器与浏览器的默认 locale 不同而发生水合错误。
export default function TagsListByLetter({tags}) {
  const list = Object.values(tags).sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
  return <ul className="category-list clean-list margin-vert--lg">
    {list.map(tag => <li key={tag.permalink}><Tag {...tag} /></li>)}
  </ul>;
}

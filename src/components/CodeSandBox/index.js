import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';

export default function CodeSandBox({slug, title = '在线代码示例', height = '600px'}) {
  const [active, setActive] = useState(false);
  const {colorMode} = useColorMode();
  const src = `https://codesandbox.io/embed/${slug}?fontsize=14&hidenavigation=1&view=preview&theme=${colorMode}`;
  return active ? <iframe className="embed-frame" src={src} title={title} style={{height}} loading="lazy" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" /> :
    <div className="embed-placeholder" style={{minHeight: height}}><p>{title}</p><button className="button button--primary" onClick={() => setActive(true)}>运行交互示例</button><a href={`https://codesandbox.io/s/${slug}`} target="_blank" rel="noopener noreferrer">在 CodeSandbox 打开 ↗</a></div>;
}

import React, {useState} from 'react';

export default function BVideo({src, bsrc}) {
  const [active, setActive] = useState(false);
  return <div className="video-embed">
    {active ? <iframe className="embed-frame" style={{aspectRatio: '16 / 9'}} src={src} title="B站教学视频" allowFullScreen loading="lazy" /> :
      <div className="embed-placeholder" style={{aspectRatio: '16 / 9'}}>
        <p>视频教程 · Bilibili</p><button className="button button--primary" onClick={() => setActive(true)}>加载视频</button>
      </div>}
    {bsrc && <p><a href={bsrc} target="_blank" rel="noopener noreferrer">在 B 站观看 ↗</a></p>}
  </div>;
}

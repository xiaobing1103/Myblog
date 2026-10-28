import React, {useState} from 'react';

export default function Image({['data-motion-poster']: poster, ...props}) {
  const [playing, setPlaying] = useState(false);
  if (!poster) return <img decoding="async" loading="lazy" {...props} />;
  return <span className="motion-image">
    <img decoding="async" loading="lazy" {...props} src={playing ? props.src : poster} />
    <button type="button" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>
      {playing ? '暂停动画' : '播放动画'}
    </button>
  </span>;
}

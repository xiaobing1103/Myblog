import React, {useState} from 'react';

export default function GradientDemo() {
  const [start, setStart] = useState('#285bda');
  const [end, setEnd] = useState('#b26be8');
  const [angle, setAngle] = useState(135);
  const background = `linear-gradient(${angle}deg, ${start}, ${end})`;
  return <section aria-label="渐变背景生成器">
    <div style={{background, height: '260px', borderRadius: '12px', marginBottom: '16px'}} />
    <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
      <label>起始颜色 <input type="color" value={start} onChange={e => setStart(e.target.value)} /></label>
      <label>结束颜色 <input type="color" value={end} onChange={e => setEnd(e.target.value)} /></label>
      <label>角度 {angle}° <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} /></label>
    </div>
    <pre><code>background: {background};</code></pre>
  </section>;
}

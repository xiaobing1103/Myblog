import React, {useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function PdfReader({src, title}) {
  const file = useBaseUrl(src);
  const viewer = useBaseUrl('pdfjs/web/viewer.html');
  const container = useRef(null);
  const [fullscreenError, setFullscreenError] = React.useState('');

  async function openFullscreen() {
    try {
      await container.current.requestFullscreen();
      setFullscreenError('');
    } catch {
      setFullscreenError('当前浏览器不支持全屏，请使用“独立阅读”打开大屏视图。');
    }
  }

  const url = `${viewer}?file=${encodeURIComponent(file)}#zoom=page-width`;
  return (
    <section className={styles.reader} ref={container} aria-label={`${title} PDF 阅读器`}>
      <div className={styles.header}>
        <div><span className={styles.label}>PDF 阅读室</span><strong>{title}</strong></div>
        <div className={styles.actions}>
          <button type="button" onClick={openFullscreen}>全屏阅读</button>
          <a href={url} target="_blank" rel="noopener noreferrer">独立阅读</a>
          <a href={file} download>下载原文件</a>
        </div>
      </div>
      <p className={styles.hint}>使用阅读器工具栏搜索、缩放或跳转页码；扫描版文件可能不支持文字搜索。</p>
      {fullscreenError && <p role="status" className={styles.hint}>{fullscreenError}</p>}
      <iframe key={file} title={`${title} PDF 预览`} src={url} className={styles.frame} allow="fullscreen" loading="lazy" />
    </section>
  );
}

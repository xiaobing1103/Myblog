import React, {lazy, Suspense, useState, useEffect, useRef} from 'react';

const OriginalCodeBlock = lazy(() => import('./Highlighter'));
const LiveCodeBlock = lazy(() => import('@theme/LiveCodeBlock'));

export default function CodeBlock(props) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, {rootMargin: '300px'});
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const plain = <pre style={{overflowX: 'auto'}}><code>{props.children}</code></pre>;
  const fallback = visible ? <Suspense fallback={plain}><OriginalCodeBlock {...props} /></Suspense> : plain;
  if (!props.live) return <div ref={ref}>{fallback}</div>;
  return <div ref={ref}>{active ? <Suspense fallback={fallback}><LiveCodeBlock {...props} /></Suspense> :
    <>{fallback}<button className="button button--primary margin-bottom--md" onClick={() => setActive(true)}>打开实时编辑器</button></>}</div>;
}

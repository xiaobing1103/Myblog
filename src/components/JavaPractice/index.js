import React, {useEffect, useRef, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {useColorMode} from '@docusaurus/theme-common';
import {exerciseById} from '@site/src/data/java-course';
import {draftKey, savePassed} from './storage';
import styles from './styles.module.css';

const origin = 'https://onecompiler.com';
const normalize = value => String(value || '').replaceAll('\r\n', '\n').trimEnd();

function Practice({exercise}) {
  const {colorMode} = useColorMode();
  const [code, setCode] = useState(exercise.starter);
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState(null);
  const [answer, setAnswer] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const frame = useRef(null);
  const currentCode = useRef(code);
  const runTimer = useRef(null);
  currentCode.current = code;

  useEffect(() => {
    try {
      const draft = localStorage.getItem(draftKey(exercise.id));
      if (draft !== null) setCode(draft);
    } catch {}
    setStorageReady(true);
    function flush() {
      try {localStorage.setItem(draftKey(exercise.id), currentCode.current);} catch {}
    }
    window.addEventListener('pagehide', flush);
    return () => {flush(); window.removeEventListener('pagehide', flush); clearTimeout(runTimer.current);};
  }, [exercise.id]);

  useEffect(() => {
    if (!storageReady) return undefined;
    const timer = setTimeout(() => {
      try {localStorage.setItem(draftKey(exercise.id), code);} catch {setStatus('浏览器无法保存草稿，可下载 Main.java 保留代码。');}
    }, 300);
    return () => clearTimeout(timer);
  }, [code, storageReady, exercise.id]);

  function sendCode(value) {
    frame.current?.contentWindow?.postMessage({eventType: 'populateCode', language: 'java', files: [{name: 'Main.java', content: value}], stdin: ''}, origin);
  }

  useEffect(() => {
    if (!active) return undefined;
    let initialized = false;
    let accepted = false;
    const timeout = setTimeout(() => setStatus('编译器暂未就绪，可重新加载、下载代码本地运行，或使用官方 Playground。'), 20000);
    function receive(event) {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow || !event.data || typeof event.data !== 'object') return;
      const data = event.data;
      if (!['change', 'runComplete'].includes(data.action)) return;
      if (!initialized) {initialized = true; sendCode(currentCode.current); return;}
      const source = data.files?.find(file => file.name?.endsWith('.java'))?.content;
      if (data.language !== 'java' || typeof source !== 'string') return;
      if (!accepted) {
        if (source !== currentCode.current) {sendCode(currentCode.current); return;}
        accepted = true;
        clearTimeout(timeout);
        setReady(true);
        setStatus('编译器已就绪，可修改代码后运行。');
      }
      if (data.action === 'change') {
        currentCode.current = source;
        setCode(source);
        setOutput(null);
        setStatus('代码已修改，运行后检查结果。');
      } else if (source === currentCode.current && data.result) {
        clearTimeout(runTimer.current);
        const result = data.result;
        const error = [result.stderr, result.exception, result.error].filter(Boolean).join('\n');
        const passed = !error && normalize(result.stdout) === normalize(exercise.expected);
        setOutput({stdout: result.stdout || '', error, passed});
        setStatus(error ? '编译或运行出错，请查看错误信息。' : passed ? '本题示例输出匹配，已记录完成进度。' : '本题示例输出未匹配，请对照预期再试一次。');
        if (passed) savePassed(exercise.id);
      }
    }
    window.addEventListener('message', receive);
    return () => {window.removeEventListener('message', receive); clearTimeout(timeout);};
  }, [active, attempt, exercise.id, exercise.expected]);

  function activate() {
    setTheme(colorMode);
    setStatus('正在加载在线编译器…');
    setActive(true);
  }
  function run() {
    setOutput(null);
    setStatus('正在编译并运行…');
    frame.current?.contentWindow?.postMessage({eventType: 'triggerRun'}, origin);
    clearTimeout(runTimer.current);
    runTimer.current = setTimeout(() => setStatus('运行暂未返回结果，请查看编译器提示，或修改代码后重试。'), 30000);
  }
  function reset() {
    currentCode.current = exercise.starter;
    setCode(exercise.starter);
    setOutput(null);
    clearTimeout(runTimer.current);
    if (active) sendCode(exercise.starter);
    setStatus('已恢复本题起始代码，完成记录保留。');
  }
  function download() {
    const url = URL.createObjectURL(new Blob([currentCode.current], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'Main.java'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <section className={styles.practice} aria-label={`${exercise.title}练习`}>
    <div className={styles.heading}><span className={styles.badge}>动手练习</span><h3>{exercise.title}</h3></div>
    <p>{exercise.task}</p>
    {!active && <>
      <label className={styles.editorLabel} htmlFor={`java-${exercise.id}`}>Main.java · 可编辑，草稿保存在当前浏览器</label>
      <textarea id={`java-${exercise.id}`} className={styles.editor} value={code} onChange={event => setCode(event.target.value)} spellCheck={false} autoCapitalize="off" autoCorrect="off" />
      <p className={styles.note}>点击后加载 OneCompiler，运行的代码会发送至该服务。也可下载后使用 Java 21 在本机运行。</p>
    </>}
    <div className={styles.actions}>
      {!active ? <button type="button" className="button button--primary" onClick={activate}>启动在线练习</button> : <button type="button" className="button button--primary" disabled={!ready} onClick={run}>运行当前代码</button>}
      <button type="button" onClick={reset}>重置代码</button>
      <button type="button" onClick={download}>下载 Main.java</button>
      {active && <button type="button" onClick={() => {setReady(false); setAttempt(value => value + 1); setStatus('正在重新加载编译器…');}}>重新加载编译器</button>}
    </div>
    {active && <iframe ref={frame} key={attempt} title={`${exercise.title} Java 在线编译器`} className={styles.frame}
      src={`${origin}/embed/java?listenToEvents=true&codeChangeEvent=true&hideNew=true&hideLanguageSelection=true&theme=${theme}`}
      onLoad={() => sendCode(currentCode.current)} referrerPolicy="strict-origin-when-cross-origin" />}
    <p className={styles.status} role="status">{status || '先修改 TODO，再启动在线练习。'}</p>
    {output && <div className={output.passed ? styles.passed : styles.failed}>
      <strong>{output.passed ? '示例检查通过' : '请继续调整'}</strong>
      <pre aria-label="实际运行输出">{output.stdout || '（无标准输出）'}</pre>
      {output.error && <pre aria-label="编译运行错误">{output.error}</pre>}
    </div>}
    <details><summary>预期输出</summary><pre>{exercise.expected}</pre><p className={styles.note}>此处检查题目示例输出；请继续尝试提示中的边界输入。仅输出相同文本不能证明业务逻辑正确。</p></details>
    <details><summary>解题提示</summary><ol>{exercise.hints.map(hint => <li key={hint}>{hint}</li>)}</ol></details>
    <button className={styles.answerButton} type="button" aria-expanded={answer} onClick={() => setAnswer(value => !value)}>{answer ? '收起参考答案' : '查看参考答案'}</button>
    {answer && <CodeBlock language="java">{exercise.solution}</CodeBlock>}
    <p className={styles.note}><a href="https://dev.java/playground/" target="_blank" rel="noopener noreferrer">官方 Java Playground ↗</a> · 本地运行：<code>java Main.java</code></p>
  </section>;
}

export default function JavaPractice({id}) {
  const exercise = exerciseById[id];
  if (!exercise) throw new Error(`未知 Java 练习：${id}`);
  return <Practice key={id} exercise={exercise} />;
}

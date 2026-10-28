import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {exercises, lessons} from '@site/src/data/java-course';
import JavaPractice from '../JavaPractice';
import {readProgress} from '../JavaPractice/storage';
import styles from './styles.module.css';

function useProgress() {
  const [progress, setProgress] = useState({});
  useEffect(() => {
    const update = () => setProgress(readProgress());
    update();
    window.addEventListener('java-progress', update);
    window.addEventListener('storage', update);
    return () => {window.removeEventListener('java-progress', update); window.removeEventListener('storage', update);};
  }, []);
  return progress;
}

export function CourseOverview() {
  const progress = useProgress();
  const completed = exercises.filter(exercise => progress[exercise.id]).length;
  return <div className={styles.course}>
    <div className={styles.progress}>
      <strong>从会写前端，到写出第一个 Java API</strong>
      <span>示例检查完成 {completed} / {exercises.length}</span>
      <progress value={completed} max={exercises.length} aria-label="Java 练习完成进度" />
      <small>进度仅保存在当前浏览器；运行结果匹配题目示例后自动记录。</small>
    </div>
    <div className={styles.grid}>{lessons.map((lesson, index) => {
      const passed = lesson.exerciseIds.filter(id => progress[id]).length;
      return <Link className={styles.card} key={lesson.slug} to={`/docs/java/${lesson.slug}`}>
        <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
        <strong>{lesson.title.slice(5)}</strong><span>{lesson.topic}</span>
        <small>{lesson.exerciseIds.length ? `${passed} / ${lesson.exerciseIds.length} 道练习` : '下载项目 · 本地实战'}</small>
      </Link>;
    })}</div>
  </div>;
}

export function PracticeWorkbench() {
  const [selected, setSelected] = useState(exercises[0].id);
  const progress = useProgress();
  const exercise = exercises.find(item => item.id === selected);
  return <div>
    <label className={styles.selectLabel} htmlFor="java-exercise-select">选择练习</label>
    <select className={styles.select} id="java-exercise-select" value={selected} onChange={event => setSelected(event.target.value)}>
      {lessons.filter(lesson => lesson.exerciseIds.length).map(lesson => <optgroup key={lesson.slug} label={lesson.title}>
        {exercises.filter(item => item.lesson === lesson.slug).map(item => <option value={item.id} key={item.id}>{progress[item.id] ? '✓ ' : ''}{item.title}</option>)}
      </optgroup>)}
    </select>
    <p><Link to={`/docs/java/${exercise.lesson}`}>返回本题知识讲解 →</Link></p>
    <JavaPractice key={selected} id={selected} />
  </div>;
}

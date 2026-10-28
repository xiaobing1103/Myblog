import React from 'react';
import styles from './ButtonDemo.module.css';

export default function ButtonDemo() {
  return <div className={styles.demo}>
    {['默认按钮', '红色按钮', '黑色按钮', '线框按钮', '红色线框', '黑色线框'].map((text, i) =>
      <button key={text} type="button" className={styles.example} style={{'--demo-color': ['#285bda', '#c42b3a', '#253047'][i % 3], background: i > 2 ? 'transparent' : undefined, color: i > 2 ? 'var(--demo-color)' : undefined}}>{text}</button>)}
  </div>;
}

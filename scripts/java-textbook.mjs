import fs from 'node:fs/promises';

export async function readTextbook() {
  const root = 'docs/java/textbook';
  const names = (await fs.readdir(root)).filter(name => /^\d{2}-.*\.mdx$/.test(name)).sort();
  return Promise.all(names.map(async name => {
    const content = await fs.readFile(`${root}/${name}`, 'utf8');
    return {
      slug: name.slice(0, -4),
      title: content.match(/^title: (.+)$/m)?.[1],
      code: content.match(/```java title="Main.java"\r?\n([\s\S]*?)\r?\n```/)?.[1],
      expected: content.match(/```text title="运行输出"\r?\n([\s\S]*?)\r?\n```/)?.[1],
    };
  }));
}

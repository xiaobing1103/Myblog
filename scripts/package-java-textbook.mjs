import fs from 'node:fs/promises';
import {strToU8, zipSync} from 'fflate';
import {readTextbook} from './java-textbook.mjs';

const lessons = (await readTextbook()).filter(lesson => lesson.code);
const files = {};
for (const lesson of lessons) {
  files[`java-textbook/${lesson.slug}/Main.java`] = strToU8(lesson.code + '\n');
  files[`java-textbook/${lesson.slug}/README.md`] = strToU8(`# ${lesson.title}\n\n在本目录执行：\n\n\`\`\`sh\njava Main.java\n\`\`\`\n\n预期输出：\n\n\`\`\`text\n${lesson.expected}\n\`\`\`\n\n完整讲解：https://xiaobing1103.github.io/Myblog/docs/java/textbook/${lesson.slug}/\n`);
}
files['java-textbook/README.md'] = strToU8('# Java 后端开发分步教材示例\n\n使用 JDK 21。各课的 Main.java 独立保存，请进入对应目录再运行，不要把所有 Main 类一起编译。\n\n01—14 课为单文件示例；第 12 课创建临时文件并清理，第 14 课短暂启动本地随机端口 HTTP 服务并自动停止。后四课请下载 java-todo-api.zip，结合教材操作 Maven 工程。\n\n目录：https://xiaobing1103.github.io/Myblog/docs/java/textbook/\n');
await fs.mkdir('static/downloads', {recursive: true});
await fs.writeFile('static/downloads/java-textbook-examples.zip', zipSync(files, {level: 9}));
console.log(`Java textbook packaged: ${lessons.length} standalone examples`);

"""把已收录的六份面试 PDF 转为逐页 Markdown；原始文件始终保留。

运行前：python scripts/inventory-pdfs.py
生成物可提交，网站构建不依赖 Python。文本不改写答案，校订答案在独立题解中。
"""
from pathlib import Path
import hashlib
import html
import json
import re
import zipfile

BOOKS = [
    ('ali-1', '2022-2-16-aliqianduan01', '阿里前端面试题 · 第一期', '../ali-1/index.md'),
    ('ali-2', '2022-2-16-aliqianduan02', '阿里前端面试题 · 第二期', '../ali-2/index.md'),
    ('handbook', '2022-2-16-dachangfo', '大厂前端面试手册', '../handbook/index.md'),
    ('ant', '2022-2-16-mayi', '蚂蚁前端面经', '../ant.md'),
    ('pdd', '2022-2-16-pdd', '拼多多、商汤前端面经', '../pdd.md'),
    ('written', '2022-2-16-mesatsu00', '前端开发工程师笔试题 00', '../written.md'),
]
DEST = Path('docs/interview/sources')
DOWNLOADS = Path('static/downloads')
DEST.mkdir(parents=True, exist_ok=True)
DOWNLOADS.mkdir(parents=True, exist_ok=True)


def escaped(line):
    # .md 也经过 MDX 解析；所有正文必须保持为文字，不执行原文 HTML/JS。
    line = html.escape(line, quote=False).replace('{', '&#123;').replace('}', '&#125;')
    return re.sub(r'([\\`*_\[\]|])', r'\\\1', line)


def page_markdown(text):
    result = []
    code = []

    def flush():
        if code:
            result.extend(['', '````text', *code, '````', ''])
            code.clear()

    for line in text.splitlines():
        short = line.strip()
        # 只识别明显的语法行，保留代码里的原始字符；不猜测修复残缺代码。
        is_code = bool(re.match(r'^(?:var |let |const |function[ (]|return\b|class |import |export |console\.|document\.|window\.|[{};]|</?[A-Za-z][^>]*>|(?:if|for|while|switch)\s*\()', short))
        if is_code:
            code.append(line)
            continue
        flush()
        if not short:
            result.append('')
        elif len(short) < 150 and re.match(r'^\d+(?:\.\d+)+[.、\s]', short) and not re.search(r'\.{5}', short):
            result.extend(['', '### ' + escaped(short), ''])
        elif len(short) < 120 and re.match(r'^\d+[、）)]\s*\S', short):
            result.extend(['', '### ' + escaped(short), ''])
        else:
            # 硬换行保留 PDF 的阅读顺序，不丢弃页眉或原答案。
            result.append(escaped(line) + '  ')
    flush()
    return '\n'.join(result)


manifest = []
for slug, key, title, solution in BOOKS:
    record = json.loads(Path(f'.cache/pdf-extract/{key}.json').read_text(encoding='utf-8'))
    body = [
        '---', f'title: "{title}｜PDF 原文对照"', f'sidebar_label: "{title} · 原文"',
        'description: 完整逐页转录，保留原题号与原答案；请配合校订解析阅读。',
        'pagination_prev: null', 'pagination_next: null', '---', '',
        f'**[阅读校订题解]({solution})** · [回到面试题库](../index.mdx)', '',
        ':::warning 原文含有错误和过时答案',
        '这里保留 PDF 可提取的全部逐页文本，方便检索、复制和核对，原答案不代表本站结论。请优先阅读上方校订题解。',
        '自动提取可能保留断行、逐字空格，复杂公式、代码缩进及图片以原 PDF 为准；不要直接执行未经校订的原代码。',
        ':::', '', f"来源：本站既有文件《{record['name']}》，共 **{record['pages']} 页**。原作者与版权信息仍以原文件为准；不将这些资料宣称为开源授权教材。", '',
        f"[下载原 PDF](/pdf/{key}/{record['name']}) · [下载本篇 Markdown](pathname:///Myblog/downloads/interview-{slug}.md)", '',
        f"原 PDF SHA-256：`{record['sha256']}`。", '',
    ]
    page_records = []
    for page in record['content']:
        n = page['page']
        body.extend([f'## 原 PDF 第 {n} 页 {{#page-{n}}}', '', page_markdown(page['text']), ''])
        if slug == 'written' and n == 1:
            body.extend(['![笔试第 3 题原始定位结构图](/img/interview/written-position.png)', ''])
        page_records.append({'page': n, 'characters': len(page['text']), 'sha256': hashlib.sha256(page['text'].encode()).hexdigest()})
    content = '\n'.join(body)
    (DEST / f'{slug}.md').write_text(content, encoding='utf-8')
    canonical = 'https://xiaobing1103.github.io/Myblog'
    route = f'/docs/interview/{slug}/'
    portable = content.replace(solution, canonical + route).replace('../index.mdx', canonical + '/docs/interview/')
    portable = portable.replace('/img/interview/written-position.png', 'img/interview/written-position.png')
    portable = portable.replace('pathname:///Myblog/', canonical + '/')
    portable = portable.replace('](/pdf/', '](' + canonical + '/pdf/').replace('](/downloads/', '](' + canonical + '/downloads/')
    (DOWNLOADS / f'interview-{slug}.md').write_text(portable, encoding='utf-8')
    manifest.append({'slug': slug, 'source': record['path'], 'pages': record['pages'], 'characters': record['characters'],
                     'sourceSha256': record['sha256'], 'markdown': f'docs/interview/sources/{slug}.md',
                     'download': f'static/downloads/interview-{slug}.md', 'pageRecords': page_records})

with zipfile.ZipFile(DOWNLOADS / 'interview-markdown.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for item in manifest:
        archive.write(item['download'], Path(item['download']).name)
    archive.write('static/img/interview/written-position.png', 'img/interview/written-position.png')
Path('reports/interview-conversion.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Converted {len(manifest)} PDFs / {sum(item['pages'] for item in manifest)} pages; originals preserved.")

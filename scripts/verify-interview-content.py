"""直接从原 PDF 重新提取，验证逐页 Markdown 未遗漏可提取文字（忽略排版空白）。"""
from pathlib import Path
import html
import json
import re
from pypdf import PdfReader

manifest = json.loads(Path('reports/interview-conversion.json').read_text(encoding='utf-8'))
total = 0
for book in manifest:
    markdown = Path(book['markdown']).read_text(encoding='utf-8')
    sections = re.split(r'^## 原 PDF 第 \d+ 页 \{#page-\d+\}\n', markdown, flags=re.M)[1:]
    pdf = PdfReader(book['source'])
    assert len(sections) == len(pdf.pages) == book['pages']
    for number, (section, page) in enumerate(zip(sections, pdf.pages), 1):
        lines = []
        in_code = False
        for line in section.splitlines():
            if line in ['````text', '````']:
                in_code = not in_code
                continue
            if not in_code:
                if line.startswith('![笔试第 3 题原始定位结构图]'): continue
                line = re.sub(r'^### ', '', line)
                line = re.sub(r'\\([\\`*_\[\]|])', r'\1', line)
                line = html.unescape(line)
            lines.append(line)
        normalize = lambda text: re.sub(r'\s+', '', text)
        actual = normalize('\n'.join(lines))
        expected = normalize(page.extract_text() or '')
        assert actual == expected, f"{book['slug']} page {number}: text mismatch"
        total += 1
print(f'逐字核对通过：6 份 / {total} 页，所有可提取文字均保留（忽略空白）。')

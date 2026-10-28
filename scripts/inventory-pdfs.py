"""只读提取现有 PDF，保留逐页文本供 Markdown 整理与原文核对。"""
from pathlib import Path
import json
import hashlib
from pypdf import PdfReader
import fitz

root = Path('static/pdf')
out = Path('.cache/pdf-extract')
out.mkdir(parents=True, exist_ok=True)
inventory = []
for file in sorted(root.rglob('*.pdf')):
    key = file.parent.name
    reader = PdfReader(file)
    pages = [{'page': n + 1, 'text': page.extract_text() or ''} for n, page in enumerate(reader.pages)]
    record = {'key': key, 'path': file.as_posix(), 'name': file.name, 'pages': len(pages),
              'characters': sum(len(page['text']) for page in pages),
              'lowTextPages': [page['page'] for page in pages if len(page['text'].strip()) < 30],
              'sha256': hashlib.sha256(file.read_bytes()).hexdigest()}
    inventory.append(record)
    (out / f'{key}.json').write_text(json.dumps({**record, 'content': pages}, ensure_ascii=False, indent=2), encoding='utf-8')
    (out / f'{key}.txt').write_text('\n\n'.join(f"===== PAGE {p['page']} =====\n{p['text']}" for p in pages), encoding='utf-8')
    if '面' in file.name or '笔试' in file.name:
        doc = fitz.open(file)
        for page_number in sorted({0, min(1, len(doc)-1)}):
            doc[page_number].get_pixmap(matrix=fitz.Matrix(1.3, 1.3)).save(str(out / f'{key}-page-{page_number+1}.png'))
print(json.dumps(inventory, ensure_ascii=False, indent=2))
Path('reports/resource-inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding='utf-8')

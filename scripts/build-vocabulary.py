"""Build a reproducible 5,200-headword subset from licensed local source snapshots.

Usage: python3 scripts/build-vocabulary.py ECDICT.csv cmn-eng.zip fra-eng.zip
Source files are build inputs only; no network or remote lookup at runtime.
"""
import csv
import hashlib
import json
import re
import sys
import zipfile
from pathlib import Path

dictionary_path, chinese_path, english_path = map(Path, sys.argv[1:])
rows = list(csv.DictReader(dictionary_path.open(encoding='utf-8')))
rows = [dict(r, word='i', frq='9', translation='pron. 我') if r['word']=='I' else r for r in rows]
dictionary = {r['word']: r for r in rows}
forms = {}
for r in rows:
    if not re.fullmatch('[a-z]+', r['word']):
        continue
    for item in r['exchange'].split('/'):
        if ':' in item:
            kind, value = item.split(':', 1)
            if kind in ('p', 'd', 'i', '3', 's') and re.fullmatch('[a-z]+', value):
                forms.setdefault(value, r['word'])

def rank(r):
    values = [int(r[k]) for k in ('frq', 'bnc') if (r[k] or '').isdigit() and int(r[k]) > 0]
    return min(values, default=999999)

candidates = {r['word']: r for r in rows if re.fullmatch('[a-z]+', r['word'])
              and re.search('[\u4e00-\u9fff]', r['translation'])
              and not re.search(r'(?:^|/)0:', r['exchange'])
              and rank(r) < 20000 and len(r['word']) < 19}
examples = {}
# Keep ordinary, standalone examples. This is an automated selection, not an
# assertion that every corpus sentence has received individual editorial review.
excluded = re.compile(r'\b(?:fuck\w*|shit\w*|bitch\w*|nigger\w*|rape\w*|porn\w*|suicid\w*|murder\w*|kill\w*|nazi\w*|hitler|god|jesus|christ|bible|allah|cocaine|heroin|terror\w*)\b', re.I)
for path, name, bilingual in [(chinese_path, 'cmn.txt', True), (english_path, 'fra.txt', False)]:
    with zipfile.ZipFile(path) as z:
        for line in z.read(name).decode('utf-8').splitlines():
            parts = line.split('\t')
            if len(parts) != 3:
                continue
            en, translation, credit = parts
            tokens = re.findall(r"[a-z]+(?:'[a-z]+)?", en.lower())
            if not 5 <= len(tokens) <= 20 or excluded.search(en) or re.search('[<>\n]', en):
                continue
            if not re.search('[.!?]$', en) or not re.search(r'\b(?:I|you|we|my|your|our|the|a|an)\b', en, re.I):
                continue
            for surface in set(tokens):
                head = surface if surface in candidates else forms.get(surface)
                if head not in candidates:
                    continue
                score = abs(len(tokens)-10) + (0 if bilingual else 8) + (0 if surface == head else 2)
                if head not in examples or score < examples[head]['score']:
                    examples[head] = dict(example=en, exampleZh=translation if bilingual else '',
                                          attribution=credit if bilingual else credit.split(' & ')[0],
                                          surface=surface, score=score)

selected = sorted((r for w, r in candidates.items() if w in examples), key=lambda r: (rank(r), r['word']))[:5200]
assert len(selected) == 5200, 'Not enough headwords with usable corpus examples'
overrides = {'the':'art. 定冠词：特指已知、已提及或唯一的人或事物', 'just':'adv. 刚刚；仅仅；正好；adj. 公正的', 'be':'v. 是；在；处于某种状态', 'can':'modal. 能；可以', 'may':'modal. 可能；可以', 'must':'modal. 必须；一定', 'will':'modal. 将会；愿意', 'would':'modal. 会；愿意（假设或委婉表达）', 'should':'modal. 应该', 'could':'modal. 能；可以（过去或委婉表达）', 'shall':'modal. 将；要不要（提议）', 'might':'modal. 可能', 'do':'v. 做；助动词，用于疑问或否定', 'have':'v. 有；吃；经历；助动词，用于完成时', 'a':'art. 一个；一（不定冠词）', 'an':'art. 一个；一（元音音素前的不定冠词）', 'i':'pron. 我'}
words = []
for r in selected:
    head=r['word']
    lines=[s.strip() for s in r['translation'].split('\\n') if s.strip() and not s.startswith('[')]
    meaning=overrides.get(head, '；'.join(lines[:3])[:260])
    if not meaning:
        meaning=r['translation'].split('\\n')[0][:260]
    ex=examples[head]
    words.append(dict(id=head, head='I' if head=='i' else head, meaning=meaning,
                      phonetic=r['phonetic'], rank=rank(r),
                      forms=sorted({v.split(':',1)[1] for v in r['exchange'].split('/') if ':' in v and v.split(':',1)[0] in ('p','d','i','3','s') and re.fullmatch('[a-z]+',v.split(':',1)[1])}),
                      **{k:v for k,v in ex.items() if k!='score'}))
data={'version':'2026-11-19','count':len(words),'counting':'按唯一词典基础词条计数；已标注的屈折变化并回原词；不等于词族数，不等于正文覆盖数或已掌握数。',
      'sources':[{'name':'ECDICT','url':'https://github.com/skywind3000/ECDICT','license':'MIT','sha256':hashlib.sha256(dictionary_path.read_bytes()).hexdigest()},
                 {'name':'Tatoeba via ManyThings','url':'https://www.manythings.org/anki/','license':'CC BY 2.0 FR','inputs':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [chinese_path,english_path]}}], 'words':words}
Path('vocabulary-data.js').write_text('/* ECDICT: MIT; Tatoeba examples: CC BY 2.0 FR. See licenses/. */\n(function(root){\nroot.SeriesVocabulary='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\nif(typeof module!=="undefined")module.exports=root.SeriesVocabulary;\n})(typeof window!=="undefined"?window:globalThis);\n',encoding='utf-8')
print(json.dumps({'headwords':len(words),'bilingualExamples':sum(bool(w['exampleZh']) for w in words),'maxRank':max(w['rank'] for w in words),'lastWords':[w['head'] for w in words[-25:]]},ensure_ascii=False))

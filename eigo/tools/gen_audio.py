"""英語のものさし：音声ファイルの事前生成

Kokoro-82M（Apache-2.0）で、辞書の全見出し語と全例文の音声を MP3 で作る。
ファイル名は正規化した文字列の FNV-1a 32bit ハッシュ（app.js の audioHash と同じ計算）。

使い方:
  python gen_audio.py words us|uk   # 見出し語
  python gen_audio.py sentences     # 例文・段落・選択肢（米音）
  python gen_audio.py index         # audio/index.js（収録一覧）を書き出す
モデル: https://github.com/thewh1teagle/kokoro-onnx/releases （kokoro-v1.0.onnx, voices-v1.0.bin）
"""
import json, os, re, subprocess, sys
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # eigo/
OUT = os.path.join(ROOT, 'audio')
MODEL_DIR = os.environ.get('KOKORO_DIR', '.')
VOICE = {'us': ('af_heart', 'en-us'), 'uk': ('bf_emma', 'en-gb')}
# 見出し語のうち、そのままでは正しく読まれないもの
SAY = {'US': 'U.S.', 'ai': 'A.I.', 'ceo': 'C.E.O.', 'app': 'app', 'vice versa': 'vice versa'}
SKIP = {'S', 'P', 's', 'p', 'd', 'ed', 'th'}


def norm(t):
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    return re.sub(r'\s+', ' ', t).strip()


def fnv(t):
    h = 0x811c9dc5
    for code in t.encode('utf-16-le').decode('utf-16-le'):
        for unit in (code.encode('utf-16-le'),):
            for i in range(0, len(unit), 2):
                h ^= unit[i] | (unit[i + 1] << 8)
                h = (h * 0x01000193) & 0xffffffff
    return format(h, '08x')


def load_data():
    js = r"""
const fs=require('fs'),vm=require('vm');const ctx={window:{}};ctx.EIGO=ctx.window.EIGO={};vm.createContext(ctx);
const base=process.argv[1];for(const f of fs.readdirSync(base).filter(f=>f.endsWith('.js')).sort())vm.runInContext(fs.readFileSync(base+'/'+f,'utf8'),ctx);
process.stdout.write(JSON.stringify(ctx.window.EIGO));"""
    out = subprocess.check_output(['node', '-e', js, os.path.join(ROOT, 'data')])
    return json.loads(out)


def word_items(E):
    items = {}
    for line in '\n'.join(E['DICT_PARTS']).split('\n'):
        line = line.strip()
        if not line or line[0] == '#':
            continue
        w = line.split('|')[0].strip()
        key = w[1:] if w.startswith('=') else w.lower().replace('’', "'")
        if key in SKIP:
            continue
        items[key] = SAY.get(key, w[1:] if w.startswith('=') else w)
    return items


def sentence_items(E):
    s = set()
    for q in E.get('CLOZE', []):
        s.add(q['q'].replace('___', q['o'][q['a']]))
        for o in q['o']:
            s.add(o)
    for p in E.get('PASSAGES', []):
        for b in p['body']:
            s.add(b)
        for q in p['qs']:
            s.add(q['q'])
            for o in q['o']:
                s.add(o)
    for g in E.get('CONFUSE', []):
        for q in g.get('q', []):
            s.add(q['s'].replace('___', g['g'][q['a']]))
    for u in E.get('GRAMMAR', []):
        for sec in u.get('sec', []):
            for ex in sec.get('ex', []):
                s.add(ex[0])
        for q in u.get('qs', []):
            s.add(q['q'].replace('___', q['o'][q['a']]))
    s.add("The central bank's decision to raise interest rates rattled the stock market, yet investors who had diversified into bonds stayed calm.")
    s.add('The committee will confirm whether the design conforms to the new standard.')
    return {norm(t): norm(t) for t in s if t.strip()}


def encode_mp3(samples, sr, path):
    import lameenc
    pcm = (np.clip(samples, -1, 1) * 32767).astype(np.int16).tobytes()
    e = lameenc.Encoder()
    e.set_bit_rate(40); e.set_in_sample_rate(sr); e.set_channels(1); e.set_quality(2)
    tmp = path + '.tmp'
    with open(tmp, 'wb') as f:
        f.write(e.encode(pcm) + e.flush())
    os.replace(tmp, path)


def load_model():
    import onnxruntime as ort
    from kokoro_onnx import Kokoro
    opt = ort.SessionOptions()
    opt.intra_op_num_threads = int(os.environ.get('TTS_THREADS', '1'))
    opt.inter_op_num_threads = 1
    sess = ort.InferenceSession(os.path.join(MODEL_DIR, 'kokoro.onnx'), opt, providers=['CPUExecutionProvider'])
    return Kokoro.from_session(sess, os.path.join(MODEL_DIR, 'voices.bin'))


def render(items, sub, voice, lang, k=None, shard=(0, 1)):
    k = k or load_model()
    d = os.path.join(OUT, sub)
    os.makedirs(d, exist_ok=True)
    seen = {}
    todo = []
    for key, text in items.items():
        h = fnv(norm(key))
        if h in seen and seen[h] != key:
            raise SystemExit(f'hash collision: {key} / {seen[h]}')
        seen[h] = key
        if int(h, 16) % shard[1] == shard[0] and not os.path.exists(os.path.join(d, h + '.mp3')):
            todo.append((h, text))
    print(sub, 'total', len(items), 'todo', len(todo), flush=True)
    for i, (h, text) in enumerate(todo):
        samples, sr = k.create(text, voice=voice, speed=1.0, lang=lang)
        # 前後の無音を詰める
        idx = np.where(np.abs(samples) > 0.005)[0]
        if len(idx):
            samples = samples[max(0, idx[0] - 1200): idx[-1] + 2400]
        encode_mp3(samples, sr, os.path.join(d, h + '.mp3'))
        if i % 100 == 0:
            print(sub, i, len(todo), flush=True)


def write_index(E):
    res = {}
    for sub in ('w/us', 'w/uk', 's/us'):
        d = os.path.join(OUT, sub)
        res[sub] = sorted(f[:-4] for f in os.listdir(d) if f.endswith('.mp3')) if os.path.isdir(d) else []
    with open(os.path.join(OUT, 'index.js'), 'w') as f:
        f.write('/* 自動生成：収録済み音声の一覧（tools/gen_audio.py index） */\n')
        f.write('window.EIGO = window.EIGO || {};\nEIGO.AUDIO = ' + json.dumps({k: ','.join(v) for k, v in res.items()}) + ';\n')
    print({k: len(v) for k, v in res.items()})


if __name__ == '__main__':
    E = load_data()
    mode = sys.argv[1]
    if mode == 'words':
        acc = sys.argv[2]
        render(word_items(E), 'w/' + acc, *VOICE[acc])
    elif mode == 'sentences':
        render(sentence_items(E), 's/us', *VOICE['us'])
    elif mode == 'all':
        # python gen_audio.py all <番号> <分割数>：全作業を分割して並列に処理する
        shard = (int(sys.argv[2]), int(sys.argv[3]))
        k = load_model()
        render(sentence_items(E), 's/us', *VOICE['us'], k=k, shard=shard)
        render(word_items(E), 'w/us', *VOICE['us'], k=k, shard=shard)
        render(word_items(E), 'w/uk', *VOICE['uk'], k=k, shard=shard)
    elif mode == 'index':
        write_index(E)

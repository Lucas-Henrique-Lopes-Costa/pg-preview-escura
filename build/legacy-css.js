/* Gera um <arquivo>-legacy.css a partir de um CSS escrito a mao.
 *
 *   node build/legacy-css.js realestate/assets/site.css
 *   -> realestate/assets/site-legacy.css
 *
 * Alvo: Tizen 5.0 / SamsungBrowser 2.2 / Chromium 63 (a TV da sala).
 * O fonte fica intacto: tudo sai em blocos @supports not (...), que so o
 * engine antigo executa -- navegador moderno pula o bloco inteiro. A unica
 * excecao e o gap de flexbox, que nenhum @supports distingue de forma
 * confiavel (Chrome 66-83 aceita row-gap no grid mas ainda nao no flex);
 * esse fica sob .no-flexgap, classe que o snippet ES5 do <head> aplica
 * depois de medir o suporte de verdade.
 */
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) { console.error('uso: node build/legacy-css.js <arquivo.css>'); process.exit(1); }
const css = fs.readFileSync(src, 'utf8');

/* ---- parser: regras com o @media vigente, comentarios removidos ------
 * Precisa ser consciente de profundidade: @keyframes tem blocos aninhados e
 * um scanner ingenuo de "proximo }" sai do lugar, colando uma chave solta no
 * seletor seguinte. */
function parse(text, media) {
  const s = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  let i = 0;
  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;
    const brace = s.indexOf('{', i);
    if (brace < 0) break;
    const prelude = s.slice(i, brace).trim();

    /* acha o } que fecha este bloco, contando profundidade */
    let depth = 1, j = brace + 1;
    while (j < s.length && depth) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}') depth--;
      j++;
    }
    const inner = s.slice(brace + 1, j - 1);

    if (/^@media\b/i.test(prelude)) {
      const cond = prelude.replace(/^@media\s*/i, '').trim();
      for (const r of parse(inner, media || cond)) rules.push(r);
    } else if (/^@supports\b/i.test(prelude)) {
      for (const r of parse(inner, media)) rules.push(r);
    } else if (/^@/.test(prelude)) {
      /* @keyframes, @font-face e afins: nada a converter aqui */
    } else {
      rules.push({ sel: prelude, body: inner, media: media || null });
    }
    i = j;
  }
  return rules;
}
const rules = parse(css);

/* display por seletor: uma regra dentro de @media costuma so ajustar o gap e
   herdar o display declarado na regra base (ex.: .auth e grid la em cima e
   dentro do media query so troca o gap). Sem esse mapa esses casos ficariam
   de fora do fallback. */
const displayBySel = {};
for (const r of rules) {
  const m = /(?:^|;)\s*display\s*:\s*([\w-]+)/.exec(r.body);
  if (m && !r.media) displayBySel[r.sel.trim()] = m[1];
}

/* separa argumentos de topo de uma funcao css */
function args(str) {
  const out = []; let depth = 0, cur = '';
  for (const ch of str) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
/* clamp(min, ideal, max) -> max. A TV tem 1920px de largura, onde todo
   clamp deste projeto ja bate no teto; usar o max entrega a ela o mesmo
   valor que um navegador moderno mostraria. */
const unclamp = v => v.replace(/clamp\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, inner) => {
  const a = args(inner);
  return a.length === 3 ? a[2] : a[a.length - 1];
});

function decls(body) {
  return body.split(';').map(d => d.trim()).filter(Boolean).map(d => {
    const k = d.indexOf(':');
    return [d.slice(0, k).trim(), d.slice(k + 1).trim()];
  }).filter(([k, v]) => k && v);
}

const buckets = { clamp: [], inset: [], logical: [], gridgap: [], aspect: [] };
const flex = [];
const autoOut = [];

/* propriedades logicas -> fisicas (o site e todo pt-BR, ltr) */
const LOGICAL = {
  'padding-inline': ['padding-left', 'padding-right'],
  'margin-inline': ['margin-left', 'margin-right'],
  'padding-block': ['padding-top', 'padding-bottom'],
  'margin-block': ['margin-top', 'margin-bottom'],
};

for (const r of rules) {
  const d = decls(r.body);
  const out = { clamp: [], inset: [], logical: [] };

  for (const [k, v] of d) {
    if (/clamp\(/.test(v) && !LOGICAL[k]) out.clamp.push(`${k}:${unclamp(v)}`);
    if (k === 'inset') {
      const p = v.split(/\s+/);
      const [t, rt, b, l] = p.length === 1 ? [p[0], p[0], p[0], p[0]]
        : p.length === 2 ? [p[0], p[1], p[0], p[1]]
        : p.length === 3 ? [p[0], p[1], p[2], p[1]] : p;
      out.inset.push(`top:${t};right:${rt};bottom:${b};left:${l}`);
    }
    if (LOGICAL[k]) {
      /* unclamp ANTES de separar: clamp(20px, 3.5vw, 52px) tem espacos dentro */
      const p = unclamp(v).split(/\s+/);
      const [a, b] = p.length === 1 ? [p[0], p[0]] : p;
      out.logical.push(`${LOGICAL[k][0]}:${a};${LOGICAL[k][1]}:${b}`);
    }
  }
  for (const key of ['clamp', 'inset', 'logical'])
    if (out[key].length) buckets[key].push({ media: r.media, text: `${r.sel}{${out[key].join(';')}}` });

  /* gap: grid ganha o nome antigo, flex vira margem */
  const disp = (d.find(([k]) => k === 'display') || [])[1] || displayBySel[r.sel.trim()];
  const gap = d.find(([k]) => k === 'gap' || k === 'row-gap' || k === 'column-gap');
  if (gap) {
    const [gk, gvRaw] = gap;
    const gv = unclamp(gvRaw);
    const alias = { gap: 'grid-gap', 'row-gap': 'grid-row-gap', 'column-gap': 'grid-column-gap' }[gk];
    if (disp === 'grid' || disp === 'inline-grid')
      buckets.gridgap.push({ media: r.media, text: `${r.sel}{${alias}:${gv}}` });
    if (disp === 'flex' || disp === 'inline-flex') {
      const dir = (d.find(([k]) => k === 'flex-direction') || [])[1] || 'row';
      const parts = gv.split(/\s+/);
      const rowGap = parts[0], colGap = parts[1] || parts[0];
      const col = dir.indexOf('column') === 0;
      flex.push({ media: r.media, text:
        `.no-flexgap ${r.sel}>*+*{${col ? `margin-top:${rowGap}` : `margin-left:${colGap}`}}` });
      if (/wrap/.test((d.find(([k]) => k === 'flex-wrap') || [])[1] || ''))
        flex.push({ media: r.media, text:
          `.no-flexgap ${r.sel}>*{margin-bottom:${rowGap}}.no-flexgap ${r.sel}{margin-bottom:-${rowGap}}` });
    }
  }

  /* margens auto tem de sobreviver as margens sinteticas do gap, que usam
     seletores mais especificos; dentro de .no-flexgap vale o !important */
  const autos = d.filter(([k, v]) => /^margin(-(top|right|bottom|left))?$/.test(k) && /\bauto\b/.test(v));
  if (autos.length)
    autoOut.push({ media: r.media,
      text: `.no-flexgap ${r.sel}{${autos.map(([k, v]) => `${k}:${v} !important`).join(';')}}` });

  /* aspect-ratio em container que segura <img> de height:100% */
  const ar = d.find(([k]) => k === 'aspect-ratio');
  /* pula o proprio <img>: elemento substituido nao renderiza ::before. Casa
     so o seletor de elemento (" img", ">img"), nunca classe tipo .prop-img. */
  if (ar && !/(^|[\s>+~])img$/.test(r.sel.trim())) {
    const [w, h] = ar[1].split('/').map(x => parseFloat(x.trim()));
    const pct = (h ? h / w : 1) * 100;
    buckets.aspect.push({ media: r.media, text:
      `${r.sel}::before{content:'';display:block;padding-top:${pct.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}%}` +
      `${r.sel}>img{position:absolute;top:0;left:0}` });
  }
}

/* ---- montagem ------------------------------------------------------- */
function block(list) {
  const plain = list.filter(x => !x.media).map(x => '  ' + x.text);
  const byMedia = {};
  for (const x of list.filter(x => x.media)) (byMedia[x.media] ||= []).push('    ' + x.text);
  return plain.join('\n') + (plain.length ? '\n' : '') +
    Object.entries(byMedia).map(([m, t]) => `  @media ${m}{\n${t.join('\n')}\n  }`).join('\n');
}
const section = (guard, title, list) => !list.length ? '' :
  `\n/* ${title} */\n@supports not (${guard}) {\n${block(list)}\n}\n`;

const out =
`/* GERADO POR build/legacy-css.js a partir de ${path.basename(src)} -- nao edite a mao.
   Compatibilidade com Tizen 5.0 / Chromium 63 (a TV da sala). Cada bloco so
   roda no engine antigo; navegador moderno pula o @supports inteiro. */
` +
  section('width: clamp(1px, 2px, 3px)', 'clamp() e do Chrome 79; cai no valor maximo, que e o que a TV (1920px) usaria', buckets.clamp) +
  section('padding-inline: 0', 'propriedades logicas sao do Chrome 87', buckets.logical) +
  section('inset: 0', 'o atalho inset e do Chrome 87', buckets.inset) +
  section('row-gap: 1px', 'no grid, o nome gap so virou alias de grid-gap no Chrome 66', buckets.gridgap) +
  section('aspect-ratio: 1 / 1', 'aspect-ratio e do Chrome 88; sem ela a caixa zera e a <img> some', buckets.aspect) +
  (!flex.length ? '' :
`\n/* gap em flexbox e do Chrome 84 e nenhum @supports o distingue com
   seguranca, entao quem decide e o teste real feito pelo snippet do <head> */
${block(flex)}
${!autoOut.length ? '' : `
/* margens auto declaradas no fonte, repostas por cima das sinteticas */
${block(autoOut)}`}
`);

const dest = src.replace(/\.css$/, '-legacy.css');
fs.writeFileSync(dest, out);
console.log(`${dest}: clamp ${buckets.clamp.length}, logicas ${buckets.logical.length}, ` +
            `inset ${buckets.inset.length}, grid-gap ${buckets.gridgap.length}, ` +
            `aspect ${buckets.aspect.length}, flex ${flex.length}`);

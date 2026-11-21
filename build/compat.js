/* Gera assets/compat.css a partir do assets/tw.css ja compilado.
 *
 * Alvo: Tizen 5.0 / SamsungBrowser 2.2 / Chromium 63 (a TV da sala).
 * Dois furos de suporte a `gap` nessa versao:
 *   - gap em grid    -> so no Chrome 66. Antes o nome era grid-gap, entao
 *                       basta reemitir a mesma regra com o nome antigo.
 *   - gap em flexbox -> so no Chrome 84. Sem alias possivel: cai para margens.
 *
 * As margens de flex ficam sob .no-flexgap, classe que o snippet inline no
 * <head> poe no <html> quando detecta a falta de suporte -- navegador moderno
 * nunca chega a ver essas regras.
 */
const fs = require('fs');

const BP = { sm: 640, md: 768, lg: 1024, xl: 1280 };

/* Classes de display flex que aparecem junto de gap no HTML, com o
   min-width a partir do qual cada uma passa a valer. */
const DISPLAYS = [
  { cls: 'flex', min: 0 },
  { cls: 'inline-flex', min: 0 },
  { cls: 'sm:inline-flex', min: BP.sm },
  { cls: 'lg:flex', min: BP.lg },
  { cls: 'xl:flex', min: BP.xl },
];
/* flex-col vale desde 0; os *:flex-row voltam ao eixo horizontal no breakpoint. */
const ROW_OVERRIDES = [
  { cls: 'sm:flex-row', min: BP.sm },
  { cls: 'md:flex-row', min: BP.md },
  { cls: 'lg:flex-row', min: BP.lg },
];

const esc = c => c.replace(/([.:\/])/g, '\\$1');
const half = v => `calc(${v} / 2)`;
const negHalf = v => `calc(${v} / -2)`;

/* Percorre o CSS minificado guardando o @media vigente de cada regra. */
function parseRules(src) {
  const out = [];
  let media = null, i = 0;
  while (i < src.length) {
    if (src.startsWith('@media', i)) {
      const open = src.indexOf('{', i);
      media = src.slice(i + 6, open).trim();
      i = open + 1;
      continue;
    }
    if (src[i] === '}') { media = null; i++; continue; }
    const open = src.indexOf('{', i);
    if (open < 0) break;
    const close = src.indexOf('}', open);
    if (close < 0) break;
    out.push({ sel: src.slice(i, open).trim(), body: src.slice(open + 1, close), media });
    i = close + 1;
  }
  return out;
}

const rules = parseRules(fs.readFileSync('assets/tw.css', 'utf8'));
const minOf = media => {
  const m = media && /min-width: *(\d+)px/.exec(media);
  return m ? +m[1] : 0;
};

/* ---- 1. grid: gap -> grid-gap --------------------------------------- */
const ALIAS = { 'gap': 'grid-gap', 'row-gap': 'grid-row-gap', 'column-gap': 'grid-column-gap' };
const gridOut = [];
for (const r of rules) {
  const decls = r.body.split(';').map(d => d.trim()).filter(Boolean)
    .map(d => [d.slice(0, d.indexOf(':')).trim(), d.slice(d.indexOf(':') + 1).trim()])
    .filter(([k]) => ALIAS[k]);
  if (decls.length) {
    gridOut.push({ min: minOf(r.media), text: `${r.sel}{${decls.map(([k, v]) => `${ALIAS[k]}:${v}`).join(';')}}` });
  }
}

/* ---- 2. flex: gap -> margens ---------------------------------------- */
const gaps = [];
for (const r of rules) {
  const m = /^\.((?:[a-z]+\\:)?gap(?:-x|-y)?-[\w.\\/]+)$/.exec(r.sel);
  if (!m) continue;
  const v = /(?:^|;)(gap|row-gap|column-gap):([^;]+)/.exec(r.body);
  if (!v) continue;
  gaps.push({
    cls: m[1].replace(/\\/g, ''),
    axis: v[1] === 'row-gap' ? 'y' : v[1] === 'column-gap' ? 'x' : 'both',
    value: v[2].trim(),
    min: minOf(r.media),
  });
}

const flexOut = [];
for (const D of DISPLAYS) {
  for (const g of gaps) {
    const base = Math.max(D.min, g.min);
    const d = esc(D.cls), c = esc(g.cls), V = g.value;
    const horiz = g.axis === 'both' || g.axis === 'x';
    const vert = g.axis === 'both' || g.axis === 'y';

    /* linha (padrao) */
    if (horiz) flexOut.push({ min: base, text: `.no-flexgap .${d}.${c}>*+*{margin-left:${V}}` });

    /* coluna */
    if (vert) flexOut.push({ min: base, text: `.no-flexgap .${d}.flex-col.${c}>*+*{margin-left:0;margin-top:${V}}` });

    /* flex-wrap: irmao a irmao nao basta, cada linha nova precisa de respiro.
       Meia margem em todo filho + meia negativa no container mantem a caixa
       externa do mesmo tamanho. Vence as regras acima por especificidade. */
    if (horiz && vert) {
      flexOut.push({ min: base, text:
        `.no-flexgap .${d}.flex-wrap.${c}{margin:${negHalf(V)}}` +
        `.no-flexgap .${d}.flex-wrap.${c}>*{margin:${half(V)}}` });
    }

    /* Texto solto antes do primeiro elemento (ex.: o botao "Falar com um
       especialista <svg>"). `> * + *` nunca alcanca esse primeiro elemento,
       porque no node de texto anterior nao ha irmao-elemento. O snippet do
       <head> marca esses containers com .txt-first e a margem entra aqui. */
    if (horiz) flexOut.push({ min: base, text:
      `.no-flexgap .${d}.txt-first.${c}>*:first-child{margin-left:${V}}` });
    if (vert) flexOut.push({ min: base, text:
      `.no-flexgap .${d}.flex-col.txt-first.${c}>*:first-child{margin-left:0;margin-top:${V}}` });

    /* flex-col que volta a ser linha num breakpoint */
    if (horiz) {
      for (const R of ROW_OVERRIDES) {
        flexOut.push({ min: Math.max(base, R.min), text:
          `.no-flexgap .${d}.${esc(R.cls)}.${c}>*+*{margin-top:0;margin-left:${V}}` });
      }
    }
  }
}

/* ---- 2b. devolve as margens auto ------------------------------------- */
/* As margens sinteticas acima usam seletores bem especificos e passariam por
   cima de utilitarios como mx-auto, que existem justamente para centralizar
   ou empurrar um item. Dentro de .no-flexgap (so navegador antigo) a
   intencao declarada tem de vencer, dai o !important. */
const autoOut = [];
for (const r of rules) {
  const m = /^\.((?:[a-z]+\\:)?m[xytblr]?-auto)$/.exec(r.sel);
  if (!m) continue;
  const body = r.body.split(';').map(d => d.trim()).filter(Boolean)
    .map(d => d + ' !important').join(';');
  autoOut.push({ min: minOf(r.media), text: `.no-flexgap .${m[1]}{${body}}` });
}

/* ---- 3. monta o arquivo --------------------------------------------- */
/* Emite em ordem crescente de min-width: com a especificidade empatada,
   quem vem depois vence, e e sempre a regra do breakpoint maior que deve. */
function emit(list) {
  const byMin = new Map();
  for (const r of list) {
    if (!byMin.has(r.min)) byMin.set(r.min, []);
    byMin.get(r.min).push(r.text);
  }
  return [...byMin.keys()].sort((a, b) => a - b).map(min => {
    const body = byMin.get(min).join('\n');
    return min === 0 ? body : `@media (min-width:${min}px){\n${body}\n}`;
  }).join('\n');
}

fs.writeFileSync('assets/compat.css',
`/* GERADO POR build/compat.js -- nao edite a mao (rode: npm run css).
   Compatibilidade com Tizen 5.0 / Chromium 63 (TV da sala). */

/* grid: gap -> grid-gap (Chromium 63 so entende o nome antigo) */
${emit(gridOut)}

/* flexbox: gap -> margens (Chromium 63 nao tem gap em flex) */
${emit(flexOut)}

/* utilitarios de margem auto tem de sobreviver as margens sinteticas acima */
${emit(autoOut)}

/* o preflight do Tailwind esconde [hidden] via :where(), que o 63 descarta */
[hidden]{display:none}

/* .aspect-video (Chrome 88) segura o VSL da home. Sem ela a div zera de
   altura e o video some -- os filhos sao todos absolute inset-0, entao o
   truque do padding no ::before recria a caixa. O .aspect-[4/5] fica de
   fora de proposito: e um <img>, que ignora ::before e, sem aspect-ratio,
   so cai na proporcao natural do arquivo. */
@supports not (aspect-ratio: 16 / 9) {
  .aspect-video::before { content: ''; display: block; padding-top: 56.25%; }
}
`);
console.log(`compat.css: ${gridOut.length} regras de grid, ${flexOut.length} de flex, ` +
            `${(fs.statSync('assets/compat.css').size / 1024).toFixed(1)} KB`);

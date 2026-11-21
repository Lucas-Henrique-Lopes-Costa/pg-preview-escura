// Gera a página de orçamento de um cliente.
//
//   node orcamento/gerar.js orcamento/_fontes/viviane.html viviane
//
// O conteúdo é criptografado (AES-GCM, chave derivada do primeiro nome do
// cliente) e só abre no navegador de quem digita o nome. A fonte em texto
// aberto fica em orcamento/_fontes/, que não vai para o git.
const fs = require('fs');
const path = require('path');
const { webcrypto } = require('crypto');
const { subtle } = webcrypto;
const getRandomValues = a => webcrypto.getRandomValues(a);

const [fonte, senha] = process.argv.slice(2);
if (!fonte || !senha) {
  console.error('uso: node orcamento/gerar.js <fonte.html> <primeiro-nome>');
  process.exit(1);
}
const slug = path.basename(fonte, '.html');
const normaliza = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();

(async () => {
  const salt = getRandomValues(new Uint8Array(16));
  const iv = getRandomValues(new Uint8Array(12));
  const base = await subtle.importKey('raw', new TextEncoder().encode(normaliza(senha)), 'PBKDF2', false, ['deriveKey']);
  const chave = await subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const cifra = await subtle.encrypt({ name: 'AES-GCM', iv }, chave, new TextEncoder().encode(fs.readFileSync(fonte, 'utf8')));
  const b64 = b => Buffer.from(b).toString('base64');
  const pacote = JSON.stringify({ s: b64(salt), i: b64(iv), c: b64(cifra) });
  const html = fs.readFileSync(path.join(__dirname, '_modelo.html'), 'utf8').replace('__PACOTE__', pacote);
  fs.mkdirSync(path.join(__dirname, slug), { recursive: true });
  fs.writeFileSync(path.join(__dirname, slug, 'index.html'), html);
  console.log('ok: orcamento/' + slug + '/');
})();

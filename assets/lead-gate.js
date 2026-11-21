(function () {
  var WEBHOOK_URL = 'https://api.humaniai.com.br/api/v1/webhook/auth/wh-85302be1-4c15-4897-9c3b-9903305bbd40';
  // Guarda cada etapa no painel (rafa.lucasprogramador.com.br → Pré-inscrições Site)
  var PAINEL_URL = 'https://rafa.lucasprogramador.com.br/api/site-lead';
  var EBOOK_URL = 'https://paraguaiglobalgroup.com/guia/';

  var OBJETIVOS = [
    'Reunião Estratégica',
    'Residência e cédula no Paraguai',
    'Abrir empresa / conta / RUC',
    'Dolarização e diversificação patrimonial',
    'Imóveis no Paraguai',
    'E-books (guias)',
    'Trabalhar no Paraguai',
    'Outro assunto'
  ];

  // data-produto dos botões → objetivo já marcado no formulário
  var PRODUTO_OBJETIVO = {
    'Reunião Estratégica': 'Reunião Estratégica',
    'Residência e cédula no Paraguai': 'Residência e cédula no Paraguai',
    'Plano Básico Expresso': 'Residência e cédula no Paraguai',
    'Plano Executive': 'Residência e cédula no Paraguai',
    'Plano Signature': 'Residência e cédula no Paraguai',
    'Abrir empresa / LLC / RUC': 'Abrir empresa / conta / RUC',
    'Conta bancária': 'Abrir empresa / conta / RUC',
    'Contabilidade BR ↔ PY': 'Abrir empresa / conta / RUC',
    'Documentação (CNH, RUC, náutica)': 'Abrir empresa / conta / RUC',
    'Aquadelta (lotes)': 'Imóveis no Paraguai',
    'Modelos de casa Blue Rock': 'Imóveis no Paraguai',
    'Avaliar meu imóvel': 'Imóveis no Paraguai',
    'E-book: Guia de Imigração': 'E-books (guias)',
    'E-book: Guia de Vagas e Salários': 'Trabalhar no Paraguai'
  };

  var FATURAMENTOS = [
    'Abaixo de R$ 1,5 milhão',
    'R$ 1,5 milhão a R$ 3 milhões',
    'R$ 3 milhões a R$ 5 milhões',
    'Acima de R$ 5 milhões'
  ];

  var PERGUNTA_INVESTIMENTO = 'Tenho pretensão de investimento de 20 a 30 mil reais para tirar minha documentação';

  var css = [
    '.lg-fundo{position:fixed;inset:0;background:rgba(6,4,2,.82);display:none;align-items:center;justify-content:center;padding:18px;z-index:9999;overflow-y:auto}',
    '.lg-fundo.on{display:flex}',
    '.lg-caixa{background:#17100a;color:#f4ecdd;border:1px solid rgba(232,185,104,.35);border-radius:8px;width:100%;max-width:440px;margin:auto;padding:28px 26px;position:relative;font-family:Sora,system-ui,sans-serif;box-shadow:0 30px 80px -20px rgba(0,0,0,.7)}',
    '.lg-caixa h3{font-family:Newsreader,Georgia,serif;font-weight:500;font-size:26px;margin:6px 0 4px}',
    '.lg-caixa p.lg-sub{font-size:13.5px;color:#cdbfa6;margin-bottom:18px}',
    '.lg-caixa .lg-kick{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#e8b968}',
    '.lg-caixa label,.lg-caixa .lg-rot{display:block;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#cdbfa6;margin:12px 0 6px}',
    '.lg-caixa input,.lg-caixa select{width:100%;font:inherit;font-size:15px;color:#1a1005;background:#fffdf8;border:1px solid #d8c9ae;border-radius:6px;padding:12px 13px;outline:none}',
    '.lg-caixa input:focus,.lg-caixa select:focus{border-color:#e8b968;box-shadow:0 0 0 3px rgba(232,185,104,.25)}',
    '.lg-passo{display:none}',
    '.lg-passo.on{display:block;animation:lgEntra .25s ease}',
    '@keyframes lgEntra{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
    '.lg-sn{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.lg-sn button{font:inherit;font-size:14px;font-weight:600;color:#f4ecdd;background:transparent;border:1px solid rgba(232,185,104,.45);border-radius:6px;padding:12px;cursor:pointer}',
    '.lg-sn button.on{background:#e8b968;border-color:#e8b968;color:#1a1005}',
    '.lg-qtd{grid-template-columns:1fr 1fr;gap:10px}','.lg-passo.lg-qtd.on{display:grid}',
    '.lg-caixa .lg-erro{color:#f4a09a;font-size:12px;margin-top:4px;display:none}',
    '.lg-caixa .lg-erro.on{display:block}',
    '.lg-caixa button.lg-ok{width:100%;margin-top:18px;background:#25d366;color:#1a1005;font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;border:0;border-radius:4px;padding:15px;cursor:pointer}',
    '.lg-caixa button.lg-ok[disabled]{opacity:.6;cursor:wait}',
    '.lg-x{position:absolute;top:10px;right:14px;background:none;border:0;color:#cdbfa6;font-size:28px;cursor:pointer;line-height:1}',
    '.lg-ebook{margin-top:12px;padding:14px;border:1px solid rgba(232,185,104,.35);border-radius:6px;background:rgba(232,185,104,.08);font-size:13px;color:#cdbfa6}',
    '.lg-ebook button{display:block;width:100%;margin-top:10px;text-align:center;background:#25d366;border:0;color:#1a1005;font:inherit;font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;border-radius:4px;padding:15px;cursor:pointer}',
    '.lg-nota{font-size:11px;color:#9d8f78;text-align:center;margin-top:10px}'
  ].join('');

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function opts(lista) {
    return '<option value="" disabled selected>Selecione uma opção</option>' + lista.map(function (p) {
      return '<option value="' + p.replace(/"/g, '&quot;') + '">' + p + '</option>';
    }).join('');
  }
  function simNao(nome) {
    return '<div class="lg-sn" data-sn="' + nome + '"><button type="button" data-v="Sim">Sim</button><button type="button" data-v="Não">Não</button></div>';
  }

  var fundo = document.createElement('div');
  fundo.className = 'lg-fundo';
  fundo.setAttribute('role', 'dialog');
  fundo.setAttribute('aria-modal', 'true');
  fundo.innerHTML =
    '<form class="lg-caixa" novalidate>' +
      '<button type="button" class="lg-x" aria-label="Fechar">&times;</button>' +
      '<span class="lg-kick">Pré-inscrição</span>' +
      '<h3>Quase lá</h3>' +
      '<p class="lg-sub">Responda rapidinho. Depois você continua a conversa direto no WhatsApp.</p>' +
      '<label for="lg-nome">Seu nome</label>' +
      '<input id="lg-nome" name="nome" autocomplete="name" placeholder="Nome e sobrenome">' +
      '<div class="lg-erro" data-erro="nome">Escreva seu nome completo.</div>' +
      '<label for="lg-tel">WhatsApp com DDD</label>' +
      '<input id="lg-tel" name="telefone" type="tel" autocomplete="tel-national" inputmode="numeric" placeholder="(11) 99999-9999">' +
      '<div class="lg-erro" data-erro="telefone">Informe um WhatsApp válido com DDD.</div>' +
      '<div class="lg-passo" data-passo="objetivo">' +
        '<label for="lg-objetivo">Qual é seu objetivo internacional?</label>' +
        '<select id="lg-objetivo" name="objetivo">' + opts(OBJETIVOS) + '</select>' +
      '</div>' +
      '<div class="lg-passo" data-passo="empresario">' +
        '<span class="lg-rot">Você é empresário?</span>' + simNao('empresario') +
      '</div>' +
      '<div class="lg-passo" data-passo="familia">' +
        '<span class="lg-rot">Tem interesse em fazer o processo para a família toda?</span>' + simNao('familia') +
        '<div class="lg-passo lg-qtd" data-passo="quantos">' +
          '<div><label for="lg-adultos">Quantos adultos?</label><input id="lg-adultos" name="adultos" type="number" min="1" max="30" inputmode="numeric" placeholder="Ex.: 2"></div>' +
          '<div><label for="lg-criancas">Quantas crianças?</label><input id="lg-criancas" name="criancas" type="number" min="0" max="30" inputmode="numeric" placeholder="Ex.: 1"></div>' +
        '</div>' +
      '</div>' +
      '<div class="lg-passo" data-passo="faturamento">' +
        '<label for="lg-faturamento">Faturamento anual da empresa (ou renda anual, se pessoa física)</label>' +
        '<select id="lg-faturamento" name="faturamento">' + opts(FATURAMENTOS) + '</select>' +
      '</div>' +
      '<div class="lg-passo" data-passo="investimento">' +
        '<span class="lg-rot">' + PERGUNTA_INVESTIMENTO + '</span>' + simNao('investimento') +
      '</div>' +
      '<div class="lg-passo lg-ebook" data-passo="ebook">Para começar, nosso guia mostra o passo a passo para morar e investir no Paraguai.' +
        '<button type="button" class="lg-ver-guia">Ver guia</button>' +
      '</div>' +
      '<div class="lg-passo" data-passo="enviar">' +
        '<button type="submit" class="lg-ok">Enviar e falar no WhatsApp</button>' +
      '</div>' +
      '<p class="lg-nota">Seus dados não são compartilhados com terceiros.</p>' +
    '</form>';
  document.body.appendChild(fundo);

  var form = fundo.querySelector('form');
  var tel = form.querySelector('#lg-tel');
  var atual = null;
  var r = {};          // respostas Sim/Não
  var leadId = null;   // um id por abertura do formulário
  var etapaEnviada = '';

  function passo(nome, on) { form.querySelector('[data-passo="' + nome + '"]').classList.toggle('on', !!on); }
  function nomeOk() { var n = form.nome.value.trim(); return n.length >= 3 && n.indexOf(' ') > -1; }
  function telOk() { return form.telefone.value.replace(/\D/g, '').length >= 10; }
  function familiaOk() {
    if (r.familia === 'Não') return true;
    return r.familia === 'Sim' && parseInt(form.adultos.value, 10) >= 1 && form.criancas.value !== '';
  }

  function dados(extra) {
    var d = {
      id: leadId,
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      objetivo: form.objetivo.value,
      empresario: r.empresario || '',
      familia: r.familia || '',
      adultos: r.familia === 'Sim' ? form.adultos.value : '',
      criancas: r.familia === 'Sim' ? form.criancas.value : '',
      faturamento: form.faturamento.value,
      investimento: r.investimento || '',
      produto: atual && atual.produto || '',
      origem: location.pathname, pagina: location.href, botao: atual ? atual.texto : ''
    };
    for (var k in extra) d[k] = extra[k];
    return d;
  }

  function envia(url, corpo, final) {
    try {
      fetch(url, {
        method: 'POST', mode: 'no-cors', keepalive: !!final,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(corpo)
      }).catch(function () {});
    } catch (err) {}
  }

  function salvaEtapa(etapa) {
    // A resposta do investimento entra na chave: ao marcar Sim já avisa o grupo
    var chave = etapa + '|' + (r.investimento || '');
    if (chave === etapaEnviada) return;
    etapaEnviada = chave;
    envia(PAINEL_URL, dados({ etapa: etapa }));
  }

  // Mostra a próxima pergunta conforme as anteriores são respondidas
  function atualiza() {
    var etapa = '';
    var ok = nomeOk() && telOk();
    passo('objetivo', ok);
    if (ok) etapa = 'contato';
    ok = ok && !!form.objetivo.value;
    passo('empresario', ok);
    if (ok) etapa = 'objetivo';
    ok = ok && !!r.empresario;
    passo('familia', ok);
    if (ok) etapa = 'empresario';
    passo('quantos', ok && r.familia === 'Sim');
    ok = ok && familiaOk();
    passo('faturamento', ok);
    if (ok) etapa = 'familia';
    ok = ok && !!form.faturamento.value;
    passo('investimento', ok);
    if (ok) etapa = 'faturamento';
    var inv = r.investimento;
    ok = ok && !!inv;
    if (ok) etapa = 'investimento';
    passo('ebook', ok && inv === 'Não');
    passo('enviar', ok && inv === 'Sim');
    if (etapa) salvaEtapa(etapa);
  }

  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '');
    if (d.length >= 12 && d.indexOf('55') === 0) d = d.slice(2);
    d = d.slice(0, 11);
    var v = d;
    if (d.length > 6) v = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    else if (d.length > 2) v = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    else if (d.length > 0) v = '(' + d;
    tel.value = v;
  });

  form.addEventListener('input', atualiza);
  form.addEventListener('change', atualiza);
  form.nome.addEventListener('blur', function () { if (form.nome.value.trim()) marca('nome', nomeOk()); });
  tel.addEventListener('blur', function () { if (tel.value) marca('telefone', telOk()); });

  form.querySelectorAll('.lg-sn').forEach(function (grupo) {
    grupo.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      r[grupo.getAttribute('data-sn')] = b.getAttribute('data-v');
      grupo.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      atualiza();
      if (grupo.getAttribute('data-sn') === 'familia' && r.familia === 'Sim') form.adultos.focus();
    });
  });

  function fecha() { fundo.classList.remove('on'); atual = null; }
  fundo.querySelector('.lg-x').addEventListener('click', fecha);
  fundo.addEventListener('click', function (e) { if (e.target === fundo) fecha(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecha(); });

  function marca(campo, ok) {
    var erro = form.querySelector('[data-erro="' + campo + '"]');
    if (erro) erro.classList.toggle('on', !ok);
    return ok;
  }

  function finaliza(destino) {
    var d = dados({ etapa: 'enviado', destino: destino, enviado_em: new Date().toISOString() });
    envia(PAINEL_URL, d, true);
    envia(WEBHOOK_URL, d, true);
    if (window.fbq) fbq('track', 'Lead');
    return d;
  }

  // Sem pretensão de investimento: grava os dados e leva ao guia, sem WhatsApp
  form.querySelector('.lg-ver-guia').addEventListener('click', function () {
    finaliza('ebook');
    setTimeout(function () { location.href = EBOOK_URL; }, 150);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!atual || !nomeOk() || !telOk() || r.investimento !== 'Sim') return;
    var btn = form.querySelector('.lg-ok');
    btn.disabled = true;
    btn.textContent = 'Abrindo WhatsApp...';

    var d = finaliza('whatsapp');
    var url = new URL(atual.href);
    var textoOriginal = url.searchParams.get('text') || 'Olá! Vim pelo site da Paraguai Global Group.';
    var familia = d.familia === 'Sim' ? 'Sim (' + d.adultos + ' adulto(s) e ' + d.criancas + ' criança(s))' : d.familia;
    var msg = textoOriginal +
      '\n\nNome: ' + d.nome +
      '\nWhatsApp: ' + d.telefone +
      '\nObjetivo: ' + d.objetivo +
      '\nÉ empresário: ' + d.empresario +
      '\nProcesso para a família: ' + familia +
      '\nFaturamento anual: ' + d.faturamento +
      '\nPretensão de investimento de 20 a 30 mil reais: ' + d.investimento;
    var destino = url.origin + url.pathname + '?text=' + encodeURIComponent(msg);

    window.open(destino, '_blank', 'noopener');
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = 'Enviar e falar no WhatsApp';
      fecha();
    }, 400);
  });

  function ehWhats(a) {
    var h = a.getAttribute('href') || '';
    return /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(h);
  }

  function abre(href, texto, produto, pre) {
    atual = { href: href, texto: (texto || '').trim().slice(0, 80), produto: produto || '' };
    leadId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
    etapaEnviada = '';
    r = {};
    form.reset();
    form.querySelectorAll('.lg-sn button').forEach(function (x) { x.classList.remove('on'); });
    form.querySelectorAll('.lg-erro').forEach(function (el) { el.classList.remove('on'); });
    if (produto && PRODUTO_OBJETIVO[produto]) form.objetivo.value = PRODUTO_OBJETIVO[produto];
    if (pre && pre.nome) form.nome.value = pre.nome;
    if (pre && OBJETIVOS.indexOf(pre.objetivo) > -1) form.objetivo.value = pre.objetivo;
    atualiza();
    fundo.classList.add('on');
    setTimeout(function () { form.nome.focus(); }, 60);
  }
  window.leadGate = { abre: abre };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a || !ehWhats(a) || a.hasAttribute('data-nogate')) return;
    e.preventDefault();
    abre(a.href, a.textContent, a.getAttribute('data-produto'));
  }, true);
})();

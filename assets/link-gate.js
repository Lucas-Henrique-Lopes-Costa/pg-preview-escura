(function () {
  var WEBHOOK_URL = 'https://api.humaniai.com.br/api/v1/webhook/auth/wh-85302be1-4c15-4897-9c3b-9903305bbd40';
  var CHAVE = 'pgg-lead';

  var form = document.getElementById('lead');
  var destino = form.getAttribute('data-destino');
  var canal = form.getAttribute('data-canal');
  var tel = form.telefone;
  var btn = form.querySelector('button');

  try {
    var salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvo) { form.nome.value = salvo.nome || ''; tel.value = salvo.telefone || ''; }
  } catch (e) {}

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

  function marca(campo, ok) {
    var erro = form.querySelector('[data-erro="' + campo + '"]');
    if (erro) erro.classList.toggle('on', !ok);
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim();
    var telefone = tel.value.trim();
    var ok = marca('nome', nome.length >= 3 && nome.indexOf(' ') > -1);
    ok = marca('telefone', telefone.replace(/\D/g, '').length >= 10) && ok;
    if (!ok) return;

    btn.disabled = true;
    btn.textContent = 'Redirecionando...';
    try { localStorage.setItem(CHAVE, JSON.stringify({ nome: nome, telefone: telefone })); } catch (err) {}

    var params = {};
    new URLSearchParams(location.search).forEach(function (v, k) { params[k] = v; });

    var vai = function () { location.href = destino; };
    var timer = setTimeout(vai, 1500);
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({
          nome: nome, telefone: telefone, interesse: canal,
          origem: location.pathname, pagina: location.href, destino: destino,
          parametros: params, enviado_em: new Date().toISOString()
        })
      }).then(function () { clearTimeout(timer); vai(); }, function () { clearTimeout(timer); vai(); });
    } catch (err) { clearTimeout(timer); vai(); }
  });
})();

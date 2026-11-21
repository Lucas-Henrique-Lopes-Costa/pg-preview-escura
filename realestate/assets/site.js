/* ===== Paraguai Global Group · Real Estate ===== */
(function () {
  'use strict';

  /* ---------- i18n dictionary ---------- */
  var I18N = {
    pt: {
      'nav.home': 'Início', 'nav.props': 'Imóveis', 'nav.search': 'Buscar', 'nav.valuation': 'Avaliar Imóvel',
      'nav.team': 'Nosso Time', 'nav.reviews': 'Avaliações', 'nav.contact': 'Contato',
      'cta.talk': 'Falar com especialista', 'cta.view': 'Ver imóveis', 'cta.wa': 'WhatsApp',
      'cta.search': 'Buscar imóveis', 'cta.value': 'Avaliar meu imóvel', 'cta.all': 'Ver todos os imóveis',
      'cta.send': 'Enviar mensagem', 'cta.schedule': 'Agendar conversa', 'cta.more': 'Saiba mais',
      'hero.eyebrow': 'Imóveis de alto padrão no Paraguai',
      'hero.title': 'Seu patrimônio, no país que mais cresce na América do Sul',
      'hero.lead': 'Assessoria completa para comprar, vender e investir em imóveis no Paraguai, com a autoridade de quem já estrutura vida e negócios por lá.',
      'stats.years': 'Anos de mercado', 'stats.deals': 'Imóveis assessorados', 'stats.audience': 'Seguidores', 'stats.usd': 'Em negócios',
      'sec.services.eye': 'O que fazemos', 'sec.services.title': 'Do primeiro contato à escritura',
      'sec.services.lead': 'Um time só para cuidar da sua operação imobiliária no Paraguai, do começo ao fim.',
      'svc.buy.t': 'Comprar', 'svc.buy.p': 'Selecionamos imóveis de alto padrão e conduzimos toda a negociação, due diligence e documentação para você comprar com segurança.',
      'svc.sell.t': 'Vender', 'svc.sell.p': 'Avaliação precisa, marketing premium e uma base de compradores brasileiros interessados no Paraguai.',
      'svc.invest.t': 'Comprar com orientação', 'svc.invest.p': 'Orientação sobre regiões, documentação, custos e impostos de cada compra no Paraguai.',
      'sec.featured.eye': 'Portfólio', 'sec.featured.title': 'Imóveis em destaque',
      'sec.featured.lead': 'Uma seleção de residências e oportunidades de investimento no Paraguai.',
      'sec.why.eye': 'Por que o Paraguai', 'sec.why.title': 'O melhor lugar da América do Sul para o seu dinheiro',
      'why.1.t': 'Contratos em dólar', 'why.1.p': 'A maior parte das compras e vendas de imóveis é fechada em dólar.',
      'why.2.t': 'Baixa carga tributária', 'why.2.p': 'Um dos regimes de impostos mais baixos do continente, para pessoas físicas e empresas.',
      'why.3.t': 'Mercado em crescimento', 'why.3.p': 'Crescimento constante do PIB e forte demanda por imóveis nas principais cidades.',
      'why.4.t': 'Segurança jurídica', 'why.4.p': 'Processo de compra estruturado, com toda a documentação conduzida por especialistas.',
      'sec.team.eye': 'Conheça o time', 'sec.team.title': 'Quem conduz a sua operação',
      'auth.lead': 'À frente da Paraguai Global Group, Rafão Lorenzatto já ajudou milhares de brasileiros a estruturar vida, negócios e patrimônio no Paraguai. A mesma autoridade agora aplicada ao mercado imobiliário.',
      'sec.reviews.eye': 'Depoimentos', 'sec.reviews.title': 'O que dizem nossos clientes',
      'sec.areas.eye': 'Onde atuamos', 'sec.areas.title': 'Regiões que assessoramos',
      'cta.band.title': 'Vamos encontrar o imóvel certo para você',
      'cta.band.lead': 'Fale agora com um especialista da Paraguai Global Group e receba uma seleção personalizada.',
      'sec.ig.title': 'Acompanhe nas redes',
      'foot.about': 'Assessoria imobiliária de alto padrão no Paraguai. Compra, venda e investimento com segurança jurídica e visão de patrimônio.',
      'foot.explore': 'Navegar', 'foot.services': 'Serviços', 'foot.contact': 'Contato',
      'foot.rights': 'Todos os direitos reservados.',
      'form.name': 'Nome completo', 'form.email': 'E-mail', 'form.phone': 'Telefone / WhatsApp',
      'form.msg': 'Sua mensagem', 'form.interest': 'Tenho interesse em', 'form.address': 'Endereço do imóvel',
      'search.type': 'Tipo', 'search.city': 'Cidade', 'search.beds': 'Quartos', 'search.budget': 'Faixa de preço', 'search.purpose': 'Finalidade'
    },
    en: {
      'nav.home': 'Home', 'nav.props': 'Properties', 'nav.search': 'Search', 'nav.valuation': 'Home Value',
      'nav.team': 'Our Team', 'nav.reviews': 'Reviews', 'nav.contact': 'Contact',
      'cta.talk': 'Talk to a specialist', 'cta.view': 'View properties', 'cta.wa': 'WhatsApp',
      'cta.search': 'Search properties', 'cta.value': 'Value my property', 'cta.all': 'View all properties',
      'cta.send': 'Send message', 'cta.schedule': 'Schedule a call', 'cta.more': 'Learn more',
      'hero.eyebrow': 'Luxury real estate in Paraguay',
      'hero.title': 'Your wealth, in the fastest-growing country in South America',
      'hero.lead': 'Full-service advisory to buy, sell and invest in Paraguayan real estate, backed by those who already build life and business there.',
      'stats.years': 'Years in the market', 'stats.deals': 'Properties advised', 'stats.audience': 'Followers', 'stats.usd': 'In deals',
      'sec.services.eye': 'What we do', 'sec.services.title': 'From first contact to closing',
      'sec.services.lead': 'A dedicated team handling your entire real estate operation in Paraguay, end to end.',
      'svc.buy.t': 'Buy', 'svc.buy.p': 'We source high-end properties and handle the full negotiation, due diligence and paperwork so you buy with confidence.',
      'svc.sell.t': 'Sell', 'svc.sell.p': 'Accurate valuation, premium marketing and a base of Brazilian buyers interested in Paraguay.',
      'svc.invest.t': 'Guided buying', 'svc.invest.p': 'Guidance on neighborhoods, paperwork, costs and taxes for every purchase in Paraguay.',
      'sec.featured.eye': 'Portfolio', 'sec.featured.title': 'Featured properties',
      'sec.featured.lead': 'A selection of residences and investment opportunities in Paraguay.',
      'sec.why.eye': 'Why Paraguay', 'sec.why.title': 'The best place in South America for your money',
      'why.1.t': 'Contracts in dollars', 'why.1.p': 'Most property sales are closed in US dollars.',
      'why.2.t': 'Low tax burden', 'why.2.p': 'One of the lowest tax regimes on the continent, for individuals and companies alike.',
      'why.3.t': 'Growing market', 'why.3.p': 'Steady GDP growth and strong housing demand across the main cities.',
      'why.4.t': 'Legal security', 'why.4.p': 'A structured buying process, with all documentation handled by specialists.',
      'sec.team.eye': 'Meet the team', 'sec.team.title': 'Who runs your operation',
      'auth.lead': 'Leading Paraguai Global Group, Rafão Lorenzatto has helped thousands of Brazilians structure life, business and wealth in Paraguay. That same authority, now applied to real estate.',
      'sec.reviews.eye': 'Testimonials', 'sec.reviews.title': 'What our clients say',
      'sec.areas.eye': 'Where we operate', 'sec.areas.title': 'Regions we advise',
      'cta.band.title': "Let's find the right property for you",
      'cta.band.lead': 'Talk to a Paraguai Global Group specialist now and get a personalized selection.',
      'sec.ig.title': 'Follow us',
      'foot.about': 'High-end real estate advisory in Paraguay. Buying, selling and investing with legal security and a wealth mindset.',
      'foot.explore': 'Explore', 'foot.services': 'Services', 'foot.contact': 'Contact',
      'foot.rights': 'All rights reserved.',
      'form.name': 'Full name', 'form.email': 'Email', 'form.phone': 'Phone / WhatsApp',
      'form.msg': 'Your message', 'form.interest': 'I am interested in', 'form.address': 'Property address',
      'search.type': 'Type', 'search.city': 'City', 'search.beds': 'Bedrooms', 'search.budget': 'Price range', 'search.purpose': 'Purpose'
    },
    es: {
      'nav.home': 'Inicio', 'nav.props': 'Propiedades', 'nav.search': 'Buscar', 'nav.valuation': 'Tasación',
      'nav.team': 'Equipo', 'nav.reviews': 'Reseñas', 'nav.contact': 'Contacto',
      'cta.talk': 'Hablar con un especialista', 'cta.view': 'Ver propiedades', 'cta.wa': 'WhatsApp',
      'cta.search': 'Buscar propiedades', 'cta.value': 'Tasar mi propiedad', 'cta.all': 'Ver todas las propiedades',
      'cta.send': 'Enviar mensaje', 'cta.schedule': 'Agendar una charla', 'cta.more': 'Saber más',
      'hero.eyebrow': 'Inmuebles de alto nivel en Paraguay',
      'hero.title': 'Tu patrimonio, en el país que más crece de Sudamérica',
      'hero.lead': 'Asesoría integral para comprar, vender e invertir en inmuebles en Paraguay, con la autoridad de quienes ya estructuran vida y negocios allí.',
      'stats.years': 'Años en el mercado', 'stats.deals': 'Inmuebles asesorados', 'stats.audience': 'Seguidores', 'stats.usd': 'En negocios',
      'sec.services.eye': 'Qué hacemos', 'sec.services.title': 'Del primer contacto a la escritura',
      'sec.services.lead': 'Un equipo dedicado a tu operación inmobiliaria en Paraguay, de principio a fin.',
      'svc.buy.t': 'Comprar', 'svc.buy.p': 'Seleccionamos inmuebles de alto nivel y conducimos toda la negociación, due diligence y documentación para que compres con seguridad.',
      'svc.sell.t': 'Vender', 'svc.sell.p': 'Tasación precisa, marketing premium y una base de compradores brasileños interesados en Paraguay.',
      'svc.invest.t': 'Compra asesorada', 'svc.invest.p': 'Orientación sobre zonas, documentación, costos e impuestos de cada compra en Paraguay.',
      'sec.featured.eye': 'Portafolio', 'sec.featured.title': 'Propiedades destacadas',
      'sec.featured.lead': 'Una selección de residencias y oportunidades de inversión en Paraguay.',
      'sec.why.eye': 'Por qué Paraguay', 'sec.why.title': 'El mejor lugar de Sudamérica para tu dinero',
      'why.1.t': 'Contratos en dólares', 'why.1.p': 'La mayor parte de las compraventas de inmuebles se cierra en dólares.',
      'why.2.t': 'Baja carga tributaria', 'why.2.p': 'Uno de los regímenes de impuestos más bajos del continente, para personas y empresas.',
      'why.3.t': 'Mercado en crecimiento', 'why.3.p': 'Crecimiento constante del PIB y fuerte demanda de inmuebles en las principales ciudades.',
      'why.4.t': 'Seguridad jurídica', 'why.4.p': 'Un proceso de compra estructurado, con toda la documentación conducida por especialistas.',
      'sec.team.eye': 'Conocé al equipo', 'sec.team.title': 'Quién conduce tu operación',
      'auth.lead': 'Al frente de Paraguai Global Group, Rafão Lorenzatto ya ayudó a miles de brasileños a estructurar vida, negocios y patrimonio en Paraguay. Esa misma autoridad, ahora aplicada al mercado inmobiliario.',
      'sec.reviews.eye': 'Testimonios', 'sec.reviews.title': 'Lo que dicen nuestros clientes',
      'sec.areas.eye': 'Dónde operamos', 'sec.areas.title': 'Regiones que asesoramos',
      'cta.band.title': 'Encontremos la propiedad ideal para vos',
      'cta.band.lead': 'Hablá ahora con un especialista de Paraguai Global Group y recibí una selección personalizada.',
      'sec.ig.title': 'Seguinos',
      'foot.about': 'Asesoría inmobiliaria de alto nivel en Paraguay. Compra, venta e inversión con seguridad jurídica y visión de patrimonio.',
      'foot.explore': 'Navegar', 'foot.services': 'Servicios', 'foot.contact': 'Contacto',
      'foot.rights': 'Todos los derechos reservados.',
      'form.name': 'Nombre completo', 'form.email': 'Correo', 'form.phone': 'Teléfono / WhatsApp',
      'form.msg': 'Tu mensaje', 'form.interest': 'Me interesa', 'form.address': 'Dirección del inmueble',
      'search.type': 'Tipo', 'search.city': 'Ciudad', 'search.beds': 'Dormitorios', 'search.budget': 'Rango de precio', 'search.purpose': 'Finalidad'
    }
  };

  function applyLang(lang) {
    if (!I18N[lang]) lang = 'pt';
    var dict = I18N[lang];
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-ph')];
      if (v != null) el.setAttribute('placeholder', v);
    });
    var cur = document.querySelector('.lang-cur');
    if (cur) cur.textContent = lang.toUpperCase();
    try { localStorage.setItem('pc_lang', lang); } catch (e) { }
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    // header scroll
    var hdr = document.querySelector('.hdr');
    var onScroll = function () { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    // mobile drawer
    var drawer = document.querySelector('.drawer');
    var openBtn = document.querySelector('.burger');
    var closeBtn = document.querySelector('.drawer-close');
    if (openBtn && drawer) openBtn.addEventListener('click', function () { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; });
    function closeDrawer() { if (drawer) { drawer.classList.remove('open'); document.body.style.overflow = ''; } }
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer) drawer.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

    // language switcher
    var lang = document.querySelector('.lang');
    if (lang) {
      var lb = lang.querySelector('.lang-btn');
      lb.addEventListener('click', function (e) { e.stopPropagation(); lang.classList.toggle('open'); });
      document.addEventListener('click', function () { lang.classList.remove('open'); });
      lang.querySelectorAll('.lang-menu button').forEach(function (b) {
        b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); lang.classList.remove('open'); });
      });
    }
    var saved = 'pt';
    try { saved = localStorage.getItem('pc_lang') || 'pt'; } catch (e) { }
    applyLang(saved);

    // hero carousel
    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
    if (slides.length) {
      var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dots button'));
      var i = 0, timer;
      function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
        dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      }
      function auto() { timer = setInterval(function () { go(i + 1); }, 6000); }
      function reset() { clearInterval(timer); auto(); }
      var prev = document.querySelector('.hero-prev'), next = document.querySelector('.hero-next');
      if (prev) prev.addEventListener('click', function () { go(i - 1); reset(); });
      if (next) next.addEventListener('click', function () { go(i + 1); reset(); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); reset(); }); });
      go(0); auto();
    }

    // scroll reveal
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-animate]').forEach(function (el) { io.observe(el); });

    // year
    document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // forms -> webhook + WhatsApp
    var WEBHOOK_URL = 'https://api.humaniai.com.br/api/v1/webhook/auth/wh-85302be1-4c15-4897-9c3b-9903305bbd40';
    document.querySelectorAll('form[data-wa]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var num = f.getAttribute('data-wa');
        var lines = [];
        var payload = { origem: 'Paraguai Global Group Real Estate', pagina: location.href, enviado_em: new Date().toISOString() };
        f.querySelectorAll('[name]').forEach(function (el) {
          if (el.value && el.value.trim()) {
            var lab = el.getAttribute('data-label') || el.name;
            lines.push('*' + lab + ':* ' + el.value.trim());
            payload[el.name] = el.value.trim();
          }
        });
        try {
          fetch(WEBHOOK_URL, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: JSON.stringify(payload)
          }).catch(function () {});
        } catch (err) {}
        var intro = f.getAttribute('data-intro') || 'Olá! Vim pelo site da Paraguai Global Group Real Estate.';
        var msg = intro + '\n\n' + lines.join('\n');
        window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank');
      });
    });
  });
})();

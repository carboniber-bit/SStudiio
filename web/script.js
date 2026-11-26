(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const zap = (msg) => `https://wa.me/5511947861455?text=${encodeURIComponent(msg)}`;
  document.documentElement.classList.add('js');

  // menu no celular
  const menu = $('#menu'), menuBtn = $('.menu-btn');
  const setMenu = (aberto) => {
    menu.classList.toggle('aberto', aberto);
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.textContent = aberto ? 'Fechar' : 'Menu';
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('aberto')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) { setMenu(false); menuBtn.focus(); }
  });

  // o botão flutuante só aparece quando o botão do topo sai da tela
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => $('.zap').classList.toggle('oculto', e.isIntersecting || e.boundingClientRect.top > 0))
      .observe($('#hero-cta'));
  }

  // seletor de tons do topo
  const heroImg = $('#hero-img');
  let pedido = 0;
  $$('.tom').forEach((b) => b.addEventListener('click', () => {
    const atual = ++pedido;
    $$('.tom').forEach((o) => o.setAttribute('aria-pressed', o === b));
    heroImg.classList.add('trocando');
    const nova = new Image();
    nova.onload = nova.onerror = () => {
      if (atual !== pedido) return;
      heroImg.src = b.dataset.img;
      heroImg.alt = b.dataset.alt;
      $('#hero-legenda').textContent = b.dataset.nome;
      heroImg.classList.remove('trocando');
    };
    nova.src = b.dataset.img;
    $('#hero-cta').href = zap(`Olá! Vi no site o tom "${b.dataset.nome}" e quero agendar uma avaliação no Sstudiio Loar.`);
  }));

  // filtros da galeria
  $$('.filtros button').forEach((b) => b.addEventListener('click', () => {
    $$('.filtros button').forEach((o) => o.setAttribute('aria-pressed', o === b));
    $$('.galeria li').forEach((li) => { li.hidden = b.dataset.f !== 'todos' && li.dataset.cat !== b.dataset.f; });
  }));

  // foto ampliada
  const dlg = $('#ampliar');
  let lista = [], i = 0;
  const mostrar = (n) => {
    i = (n + lista.length) % lista.length;
    $('#ampliar-img').src = lista[i].dataset.full;
    $('#ampliar-img').alt = lista[i].querySelector('img').alt;
    $('#ampliar-legenda').textContent = lista[i].dataset.legenda;
  };
  $$('.foto').forEach((f) => f.addEventListener('click', () => {
    lista = $$('.galeria li:not([hidden]) .foto');
    mostrar(lista.indexOf(f));
    dlg.showModal();
  }));
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-fechar]')) dlg.close();
    const p = e.target.closest('[data-passo]');
    if (p) mostrar(i + Number(p.dataset.passo));
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') mostrar(i + 1);
    if (e.key === 'ArrowLeft') mostrar(i - 1);
  });

  // formulário -> WhatsApp (nada é salvo no site)
  $('#form-agenda').addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const nome = d.get('nome').trim(), quando = d.get('quando').trim();
    const msg = `Olá! Meu nome é ${nome}. Quero agendar no Sstudiio Loar.\nServiço: ${d.get('servico')}${quando ? `\nPreferência: ${quando}` : ''}`;
    const url = zap(msg);
    window.open(url, '_blank', 'noopener');
  });
})();

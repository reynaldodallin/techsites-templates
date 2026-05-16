/* ============================================================
   AURORA IMÓVEIS — Global JS
   ============================================================ */
(function () {
  'use strict';

  // ---------- Theme toggle (light/dark) ----------
  const root = document.documentElement;
  const stored = localStorage.getItem('aurora-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  function setupThemeToggles() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('aurora-theme', next);
      });
    });
  }

  // ---------- Mobile menu (hamburger) ----------
  function setupMobileMenu() {
    const burger = document.querySelector('[data-hamburger]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Header scroll state ----------
  function setupHeaderScroll() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    const handle = () => header.classList.toggle('header--scrolled', window.scrollY > 8);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
  }

  // ---------- Back to top ----------
  function setupBackToTop() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    const handle = () => btn.classList.toggle('visible', window.scrollY > 400);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Active nav link ----------
  function setupActiveLink() {
    const raw = location.pathname.replace(/\/+$/, '') || '/';
    const page = (raw.split('/').pop() || 'index').toLowerCase().replace(/\.html$/, '');
    document.querySelectorAll('[data-nav] a, [data-mobile-menu] a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase().replace(/\.html$/, '').replace(/\/$/, '') || '/';
      const hpage = href.split('/').pop() || 'index';
      if (hpage === page || (page === 'index' && (href === '/' || href === ''))) {
        a.classList.add('active');
      }
    });
  }

  // ---------- Footer year ----------
  function setupYear() {
    const el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ---------- Search bar (home + lista) ----------
  function setupSearchForms() {
    document.querySelectorAll('[data-search-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const params = new URLSearchParams();
        new FormData(form).forEach((v, k) => { if (v) params.set(k, v); });
        location.href = 'features.html' + (params.toString() ? '?' + params.toString() : '');
      });
    });
  }

  // ---------- Filtro client-side (página de imóveis) ----------
  function setupListFilters() {
    const form = document.querySelector('[data-filter-form]');
    const cards = document.querySelectorAll('[data-property]');
    const countEl = document.querySelector('[data-result-count]');
    const emptyEl = document.querySelector('[data-empty]');
    if (!form || !cards.length) return;

    function applyFilters() {
      const data = Object.fromEntries(new FormData(form).entries());
      let visible = 0;
      cards.forEach(card => {
        const ok = (
          (!data.tipo  || card.dataset.tipo  === data.tipo) &&
          (!data.modal || card.dataset.modal === data.modal) &&
          (!data.bairro || card.dataset.bairro === data.bairro) &&
          (!data.quartos || (parseInt(card.dataset.quartos, 10) >= parseInt(data.quartos, 10))) &&
          (!data.preco || (parseInt(card.dataset.preco, 10) <= parseInt(data.preco, 10)))
        );
        card.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });
      if (countEl) countEl.textContent = visible;
      if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
    }

    // Aplica filtros vindos da query string
    const q = new URLSearchParams(location.search);
    q.forEach((v, k) => {
      const el = form.elements.namedItem(k);
      if (el) el.value = v;
    });

    form.addEventListener('submit', e => { e.preventDefault(); applyFilters(); });
    form.addEventListener('change', applyFilters);
    form.addEventListener('reset', () => setTimeout(applyFilters, 0));
    applyFilters();
  }

  // ---------- Galeria de detalhe (clique para trocar foto principal) ----------
  function setupGallery() {
    const main = document.querySelector('[data-gallery-main]');
    if (!main) return;
    document.querySelectorAll('[data-gallery-thumb]').forEach(t => {
      t.addEventListener('click', e => {
        e.preventDefault();
        const src = t.querySelector('img').getAttribute('src');
        main.querySelector('img').setAttribute('src', src);
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ---------- Form submit fake (UX) ----------
  function setupContactForms() {
    document.querySelectorAll('[data-contact-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Sending...';
        setTimeout(() => {
          btn.textContent = '✓ Message sent';
          btn.style.background = '#16a34a';
          form.reset();
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = original;
            btn.style.background = '';
          }, 2500);
        }, 800);
      });
    });
  }

  // ---------- Init ----------
  function init() {
    setupThemeToggles();
    setupMobileMenu();
    setupHeaderScroll();
    setupBackToTop();
    setupActiveLink();
    setupYear();
    setupSearchForms();
    setupListFilters();
    setupGallery();
    setupContactForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

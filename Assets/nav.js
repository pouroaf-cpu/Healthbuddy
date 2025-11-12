// /assets/nav.js  (no <script> wrapper)
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/partials/header.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Header not found at /partials/header.html');
    const html = await res.text();

    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const header = tmp.querySelector('header.header');
    const mobile = tmp.querySelector('#mobile-menu');
    if (!header) throw new Error('No <header> found in partial');

    // Inject at top of <body>
    document.body.insertAdjacentElement('afterbegin', header);
    if (mobile) header.insertAdjacentElement('afterend', mobile);

    // Active link highlight
    const current = location.pathname.replace(/index\.html$/,'') || '/';
    const markActive = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
        const href = (a.getAttribute('href') || '').replace(/index\.html$/,'') || '/';
        if (href === current) a.setAttribute('aria-current','page');
      });
    };
    markActive(header);
    if (mobile) markActive(mobile);

    // Burger toggle
    const burger = document.getElementById('burger');
    const menu   = document.getElementById('mobile-menu');
    const open = () => {
      burger.setAttribute('aria-expanded','true');
      burger.setAttribute('aria-label','Close menu');
      menu.classList.add('open');
      menu.removeAttribute('hidden');
      document.body.classList.add('nav-open');
    };
    const close = () => {
      burger.setAttribute('aria-expanded','false');
      burger.setAttribute('aria-label','Open menu');
      menu.classList.remove('open');
      menu.setAttribute('hidden','');
      document.body.classList.remove('nav-open');
    };
    burger?.addEventListener('click', () => {
      (burger.getAttribute('aria-expanded') === 'true') ? close() : open();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') close();
    });
    document.addEventListener('click', e => {
      if (burger?.getAttribute('aria-expanded') !== 'true') return;
      if (e.target.closest('#mobile-menu') || e.target.closest('#burger')) return;
      close();
    });

    console.info('[nav] Header injected');
  } catch (err) {
    console.error('[nav] Failed to inject header:', err);
  }
});

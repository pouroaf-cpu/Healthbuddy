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

    // Highlight active link
    const current = location.pathname.replace(/index\.html$/,'') || '/';
    const markActive = root => {
      root.querySelectorAll('a[href]').forEach(a => {
        const href = (a.getAttribute('href') || '').replace(/index\.html$/,'') || '/';
        if (href === current) a.setAttribute('aria-current','page');
      });
    };
    markActive(document);
    if (mobile) markActive(mobile);

    /* ===== Desktop dropdowns ===== */
    const closeAll = () => {
      document.querySelectorAll('.drop-trigger[aria-expanded="true"]').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const id = btn.getAttribute('aria-controls');
        id && document.getElementById(id)?.classList.remove('open');
      });
    };

    document.addEventListener('click', e => {
      const trigger = e.target.closest('.drop-trigger');
      const inDropdown = e.target.closest('.has-dropdown');
      if (trigger) {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (!expanded) {
          trigger.setAttribute('aria-expanded', 'true');
          const id = trigger.getAttribute('aria-controls');
          id && document.getElementById(id)?.classList.add('open');
        }
      } else if (!inDropdown) {
        closeAll();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAll();
    });

    /* ===== Mobile: burger toggle ===== */
    const burger = document.getElementById('burger');
    const menu   = document.getElementById('mobile-menu');
    const openMenu = () => {
      burger.setAttribute('aria-expanded','true');
      burger.setAttribute('aria-label','Close menu');
      menu.classList.add('open');
      menu.removeAttribute('hidden');
      document.body.classList.add('nav-open');
    };
    const closeMenu = () => {
      burger.setAttribute('aria-expanded','false');
      burger.setAttribute('aria-label','Open menu');
      menu.classList.remove('open');
      menu.setAttribute('hidden','');
      document.body.classList.remove('nav-open');
    };
    burger?.addEventListener('click', () => {
      (burger.getAttribute('aria-expanded') === 'true') ? closeMenu() : openMenu();
    });
    document.addEventListener('click', e => {
      if (burger?.getAttribute('aria-expanded') !== 'true') return;
      if (e.target.closest('#mobile-menu') || e.target.closest('#burger')) return;
      closeMenu();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') closeMenu();
    });

    // Mobile accordions
    document.querySelectorAll('.mobile-acc').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.toggleAttribute('hidden');
      });
    });

    // Close mobile menu on link click
    mobile?.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (link) closeMenu();
    });

    // Close dropdowns when switching to desktop layout
    const MQ = window.matchMedia('(min-width: 980px)');
    MQ.addEventListener?.('change', () => closeAll());

    console.info('[nav] Header + dropdowns injected');
  } catch (err) {
    console.error('[nav] Failed to inject header:', err);
  }
});

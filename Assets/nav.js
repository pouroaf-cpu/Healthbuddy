<script>
(async () => {
  // 1) Fetch & inject shared header partial
  try {
    const res = await fetch('/partials/header.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load /partials/header.html');
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    // Insert header at top of <body> and mobile menu right after it
    const headerEl = wrapper.querySelector('header.header');
    const mobileEl = wrapper.querySelector('#mobile-menu');
    if (headerEl) document.body.insertAdjacentElement('afterbegin', headerEl);
    if (mobileEl) headerEl.insertAdjacentElement('afterend', mobileEl);

    // 2) Active link highlighting (desktop + mobile)
    const current = location.pathname.replace(/index\.html$/,'') || '/';
    const setActive = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        // Normalize href (treat "/" and "/index.html" as same)
        const norm = href.replace(/index\.html$/,'') || '/';
        if (norm === current) a.setAttribute('aria-current', 'page');
      });
    };
    setActive(document);
    setActive(mobileEl || document);

    // 3) Burger menu logic (accessible)
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    const openMenu = () => {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      mobileMenu.hidden = false;
      document.body.classList.add('menu-open'); // optional hook for your CSS
      // focus first link for accessibility
      const firstLink = mobileMenu.querySelector('a[href]');
      firstLink && firstLink.focus({ preventScroll: true });
    };

    const closeMenu = () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      mobileMenu.hidden = true;
      document.body.classList.remove('menu-open');
      burger.focus({ preventScroll: true });
    };

    const toggleMenu = () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    };

    burger?.addEventListener('click', toggleMenu);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeMenu();
    });

    // Close when clicking a link in the mobile menu
    mobileMenu?.addEventListener('click', (e) => {
      const el = e.target.closest('a[href]');
      if (el) closeMenu();
    });

    // Optional: close on outside click
    document.addEventListener('click', (e) => {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      if (e.target.closest('#mobile-menu') || e.target.closest('#burger')) return;
      closeMenu();
    });

    // Optional: close on resize to desktop
    const MQ = window.matchMedia('(min-width: 960px)');
    MQ.addEventListener?.('change', () => { if (MQ.matches) closeMenu(); });

  } catch (err) {
    console.warn(err);
  }
})();
</script>

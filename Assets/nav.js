// /assets/nav.js
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const host = document.getElementById('site-header');
    if (!host) {
      console.warn('InjectBuddy nav: #site-header not found');
      return;
    }

    fetch('/header.html')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load /header.html: ' + res.status);
        return res.text();
      })
      .then((html) => {
        host.innerHTML = html;
        console.log('InjectBuddy nav: header injected');
        initNav(host);
      })
      .catch((err) => {
        console.error('InjectBuddy nav: header load error', err);
      });
  });

  function initNav(host) {
    const header = host.querySelector('.ib-header');
    if (!header) {
      console.warn('InjectBuddy nav: .ib-header not found after injection');
      return;
    }

    const burger = header.querySelector('.ib-burger');
    const mobileMenu = header.querySelector('.ib-mobile-menu');

    // ---- Burger (mobile) ----
    if (burger && mobileMenu) {
      console.log('InjectBuddy nav: burger wired');

      // Ensure predictable initial state
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('hidden', '');
      }
      burger.setAttribute('aria-expanded', mobileMenu.classList.contains('open') ? 'true' : 'false');

      burger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');

        if (isOpen) {
          mobileMenu.removeAttribute('hidden');
          burger.setAttribute('aria-expanded', 'true');
          document.body.classList.add('ib-nav-open');
        } else {
          mobileMenu.setAttribute('hidden', '');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('ib-nav-open');
        }
      });

      // Close menu when clicking a link inside
      mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('ib-nav-open');
      });
    } else {
      console.warn('InjectBuddy nav: burger or mobile menu not found');
    }

    // ---- Active link highlighting via data-match ----
    const path = window.location.pathname || '/';
    const links = header.querySelectorAll('[data-match]');

    links.forEach((link) => {
      const match = link.getAttribute('data-match');
      if (!match) return;

      // Safer matching: exact, /subpaths, or .html variant
      const isMatch =
        path === match ||
        path === match + '.html' ||
        path.startsWith(match + '/');

      if (isMatch) link.classList.add('is-active');
    });
  }
})();

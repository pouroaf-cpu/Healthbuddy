// /assets/nav.js
(function () {
  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const host = document.getElementById('site-header');
    if (!host) {
      console.warn('InjectBuddy nav: #site-header not found');
      return;
    }

    // Load shared header.html
    fetch('/header.html')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load /header.html: ' + res.status);
        return res.text();
      })
      .then(html => {
        host.innerHTML = html;
        console.log('InjectBuddy nav: header injected');
        initNav(host);
      })
      .catch(err => {
        console.error('InjectBuddy nav: header load error', err);
      });
  });

  function initNav(host) {
    const header     = host.querySelector('.ib-header');
    const burger     = header?.querySelector('.ib-burger');
    const mobileMenu = header?.querySelector('.ib-mobile-menu');

    if (!header) {
      console.warn('InjectBuddy nav: .ib-header not found after injection');
      return;
    }

    // ---- Burger (mobile) ----
    if (burger && mobileMenu) {
      console.log('InjectBuddy nav: burger wired');

      burger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('ib-mobile-open');

        if (isOpen) {
          mobileMenu.removeAttribute('hidden');
          mobileMenu.style.display = 'block';
          burger.setAttribute('aria-expanded', 'true');
          document.body.classList.add('ib-nav-open');
        } else {
          mobileMenu.setAttribute('hidden', '');
          mobileMenu.style.display = 'none';
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('ib-nav-open');
        }
      });

      // Close menu when clicking a link inside
      mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        mobileMenu.classList.remove('ib-mobile-open');
        mobileMenu.setAttribute('hidden', '');
        mobileMenu.style.display = 'none';
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('ib-nav-open');
      });
    } else {
      console.warn('InjectBuddy nav: burger or mobile menu not found');
    }

    // ---- Active link highlighting via data-match ----
    const path  = window.location.pathname || '/';
    const links = header.querySelectorAll('[data-match]');

    links.forEach(link => {
      const match = link.getAttribute('data-match');
      if (!match) return;

      // Match if the current path contains the value, e.g. /contact.html vs /contact
      if (path.indexOf(match) !== -1) {
        link.classList.add('is-active');
      }
    });
  }
})();

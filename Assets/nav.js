// /assets/nav.js  (in your deployed root; repo folder name doesn't matter)
(function () {
  const host = document.getElementById('site-header');
  if (!host) return;

  // 1) Load the shared header.html
  fetch('/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load header.html');
      return res.text();
    })
    .then(html => {
      host.innerHTML = html;
      initNav();
    })
    .catch(err => {
      console.error('Header load error:', err);
    });

  function initNav() {
    const header = host.querySelector('.ib-header');
    if (!header) return;

    const burger     = header.querySelector('.ib-burger');
    const mobileMenu = header.querySelector('.ib-mobile-menu');

    // 2) Burger toggle (mobile)
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const isOpen = !mobileMenu.hasAttribute('hidden');

        if (isOpen) {
          // close
          mobileMenu.setAttribute('hidden', '');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('ib-nav-open');
        } else {
          // open
          mobileMenu.removeAttribute('hidden');
          burger.setAttribute('aria-expanded', 'true');
          document.body.classList.add('ib-nav-open');
        }
      });

      // Close mobile menu when clicking any link inside it
      mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('ib-nav-open');
      });
    }

    // 3) Active link highlighting based on data-match
    const path  = window.location.pathname || '/';
    const links = header.querySelectorAll('[data-match]');

    links.forEach(link => {
      const match = link.getAttribute('data-match');
      if (!match) return;

      // Simple contains check (e.g. "/contact" matches "/contact.html")
      if (path.indexOf(match) !== -1) {
        link.classList.add('is-active');
      }
    });
  }
})();

// /assets/nav.js
(function () {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  // Fetch header.html and inject
  fetch('/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load header.html');
      return res.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      initNavBehaviour();
    })
    .catch(err => {
      console.error('Header load error:', err);
    });

  function initNavBehaviour() {
    const header = placeholder.querySelector('.ib-header');
    if (!header) return;

    const burger      = header.querySelector('.ib-burger');
    const mobileMenu  = header.querySelector('.ib-mobile-menu');
    const desktopTools= header.querySelector('.ib-has-dropdown');
    const toolsToggle = header.querySelector('.ib-dropdown-toggle');

    // Active link highlighting
    const path = window.location.pathname || '/';
    const allLinks = header.querySelectorAll('[data-match]');
    allLinks.forEach(link => {
      const match = link.getAttribute('data-match');
      if (!match) return;
      if (path === match || path.startsWith(match)) {
        link.classList.add('is-active');
      }
    });

    // Desktop "Tools" dropdown (if present)
    if (desktopTools && toolsToggle) {
      toolsToggle.addEventListener('click', () => {
        const open = desktopTools.classList.toggle('open');
        toolsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      document.addEventListener('click', e => {
        if (!desktopTools.contains(e.target)) {
          desktopTools.classList.remove('open');
          toolsToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Burger toggle (mobile)
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const isOpen = mobileMenu.hasAttribute('hidden') === false;
        if (isOpen) {
          mobileMenu.setAttribute('hidden', '');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('ib-nav-open');
        } else {
          mobileMenu.removeAttribute('hidden');
          burger.setAttribute('aria-expanded', 'true');
          document.body.classList.add('ib-nav-open');
        }
      });

      // Close mobile menu when clicking a link
      mobileMenu.addEventListener('click', e => {
        const a = e.target.closest('a');
        if (!a) return;
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('ib-nav-open');
      });
    }
  }
})();

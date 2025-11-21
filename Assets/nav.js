// /assets/nav.js
(function () {
  const host = document.getElementById('site-header');
  if (!host) return;

  // Load shared header from header.html (keeps your original desktop look)
  fetch('/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load header.html');
      return res.text();
    })
    .then(html => {
      host.innerHTML = html;
      initNav(host);
    })
    .catch(err => {
      console.error('Header load error:', err);
    });

  function initNav(scope) {
    // Allow either .ib-header or plain <header>
    const header =
      scope.querySelector('.ib-header') ||
      scope.querySelector('header');
    if (!header) return;

    // Support both naming styles for burger + mobile menu
    const burger =
      header.querySelector('.ib-burger') ||
      header.querySelector('.burger') ||
      header.querySelector('[data-role="burger"]');

    const mobileMenu =
      header.querySelector('.ib-mobile-menu') ||
      header.querySelector('#mobile-menu') ||
      header.querySelector('[data-role="mobile-menu"]');

    // Highlight active link using data-nav
    const path = window.location.pathname || '/';
    header.querySelectorAll('[data-nav]').forEach(link => {
      const key = link.getAttribute('data-nav');
      if (!key) return;

      if (
        (key === 'home' && (path === '/' || path === '/index.html')) ||
        path.includes(key)
      ) {
        link.setAttribute('aria-current', 'page');
      }
    });

    if (!burger || !mobileMenu) return;

    // Detect whether this menu is using [hidden] or a class toggle
    const usesHidden = mobileMenu.hasAttribute('hidden');

    function isOpen() {
      if (usesHidden) return !mobileMenu.hasAttribute('hidden');
      return mobileMenu.classList.contains('open');
    }

    function openMenu() {
      if (usesHidden) {
        mobileMenu.removeAttribute('hidden');
      } else {
        mobileMenu.classList.add('open');
      }
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      if (usesHidden) {
        mobileMenu.setAttribute('hidden', '');
      } else {
        mobileMenu.classList.remove('open');
      }
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    burger.addEventListener('click', () => {
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close mobile menu when clicking any link inside it
    mobileMenu.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a) return;
      closeMenu();
    });
  }
})();

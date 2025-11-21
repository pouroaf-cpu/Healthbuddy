// assets/nav.js
(function () {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  // Load shared header
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
    const header = placeholder.querySelector('header');
    if (!header) return;

    const burger = header.querySelector('.burger');
    const mobileMenu = header.querySelector('#mobile-menu');

    // Highlight active link
    const path = window.location.pathname;
    const links = header.querySelectorAll('[data-nav]');
    links.forEach(link => {
      const val = link.getAttribute('data-nav');
      if (!val) return;
      if (path.includes(val)) {
        link.setAttribute('aria-current', 'page');
      }
    });

    // Burger toggle
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('nav-open', isOpen);
      });

      // Close menu on link click
      mobileMenu.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    }
  }
})();

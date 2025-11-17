// /nav.js
(function () {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  fetch('/header.html')
    .then(res => res.text())
    .then(html => {
      placeholder.innerHTML = html;

      const path = window.location.pathname.toLowerCase();

      let currentPage = '';

      if (path === '/' || path === '/index.html') currentPage = 'home';
      else if (path.includes('calculator')) currentPage = 'trt';
      else if (path.includes('peptide')) currentPage = 'peptide';
      else if (path.includes('bmi')) currentPage = 'bmi';
      else if (path.includes('free-test')) currentPage = 'free-test';
      else if (path.includes('guides')) currentPage = 'guides';
      else if (path.includes('contact')) currentPage = 'contact';
      else if (path.includes('about')) currentPage = 'about';

      const markActiveLinks = () => {
        const links = placeholder.querySelectorAll('a[data-page]');
        links.forEach(a => {
          const page = a.getAttribute('data-page');
          if (page === currentPage) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });

        // If active is inside desktop Tools dropdown, mark Tools item as active
        const toolsItem = placeholder.querySelector('[data-tools]');
        if (toolsItem) {
          const activeInTools = toolsItem.querySelector('.ib-dropdown a.active');
          if (activeInTools) {
            toolsItem.classList.add('active');
          } else {
            toolsItem.classList.remove('active');
          }
        }
      };

      markActiveLinks();

      /* Desktop Tools dropdown click (in addition to hover) */
      const toolsItem = placeholder.querySelector('[data-tools]');
      const toolsBtn = placeholder.querySelector('[data-tools-toggle]');
      const toolsMenu = placeholder.querySelector('[data-tools-menu]');

      if (toolsItem && toolsBtn && toolsMenu) {
        toolsBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = toolsItem.classList.toggle('open');
          toolsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', function (e) {
          if (!toolsItem.contains(e.target)) {
            toolsItem.classList.remove('open');
            toolsBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      /* Mobile burger + menu */
      const burger = placeholder.querySelector('[data-burger]');
      const mobileMenu = placeholder.querySelector('[data-mobile-menu]');

      if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
          const isOpen = mobileMenu.classList.toggle('open');
          burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
          });
        });
      }

      /* Mobile Tools toggle */
      const mobileToolsBtn = placeholder.querySelector('[data-mobile-tools-toggle]');
      const mobileToolsList = placeholder.querySelector('[data-mobile-tools-list]');

      if (mobileToolsBtn && mobileToolsList) {
        mobileToolsBtn.addEventListener('click', function () {
          const isOpen = mobileToolsList.classList.toggle('open');
          mobileToolsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    })
    .catch(err => {
      console.error('Failed to load header.html', err);
    });
})();

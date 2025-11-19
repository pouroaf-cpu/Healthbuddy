// /assets/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('site-header');
  if (!host) return;

  // Inject shared header + mobile menu
  host.innerHTML = `
<header class="header" role="banner">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="InjectBuddy Home">
      <div class="logo" aria-hidden="true"></div><h1>InjectBuddy</h1>
    </a>

    <nav class="nav" aria-label="Primary">
      <a href="/calculator.html" data-nav="calculator">Dosage Calculator</a>
      <a href="/peptide.html" data-nav="peptide">Peptide Reconstitution</a>
      <a href="/contact.html" data-nav="contact">Contact</a>
      <a href="/about.html" data-nav="about">About</a>
    </nav>

    <button class="burger" id="burger" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16"/>
      </svg>
    </button>
  </div>
</header>

<nav id="mobile-menu" class="mobile-menu" aria-label="Mobile">
  <div class="container">
    <div class="mobile-links" role="menu">
      <a href="/calculator.html" role="menuitem" data-nav="calculator">Dosage Calculator</a>
      <a href="/peptide.html" role="menuitem" data-nav="peptide">Peptide Reconstitution</a>
      <a href="/contact.html" role="menuitem" data-nav="contact">Contact</a>
      <a href="/about.html" role="menuitem" data-nav="about">About</a>
    </div>
  </div>
</nav>
  `;

  // Burger toggle
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobile-menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Optional: close menu when clicking a link
    menu.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link) return;
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  }

  // Active link highlighting
  const path = window.location.pathname || '/';
  const key =
    path.includes('calculator') ? 'calculator' :
    path.includes('peptide')    ? 'peptide'    :
    path.includes('contact')    ? 'contact'    :
    path.includes('about')      ? 'about'      :
    null;

  if (key) {
    document
      .querySelectorAll(`[data-nav="${key}"]`)
      .forEach(el => el.setAttribute('aria-current', 'page'));
  }
});

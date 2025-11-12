<script>
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

    // Inject at top of body
    document.body.insertAdjacentElement('afterbegin', header);
    if (mobile) header.insertAdjacentElement('afterend', mobile);

    // Active link
    const current = location.pathname.replace(/index\\.html$/, '') || '/';
    const highlight = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href').replace(/index\\.html$/, '') || '/';
        if (href === current) a.setAttribute('aria-current', 'page');
      });
    };
    highlight(header);
    if (mobile) highlight(mobile);

    // Burger toggle
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu');
    burger?.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
      document.body.classList.toggle('nav-open', !expanded);
    });

    console.info('✅ InjectBuddy header loaded');
  } catch (err) {
    console.error('❌ nav.js error:', err);
  }
});
</script>

<script>
(async () => {
  // Fetch and inject the shared header
  try {
    const res = await fetch('/partials/header.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load header');
    const html = await res.text();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    // Set active link
    const path = location.pathname.replace(/index\.html$/,'') || '/';
    tmp.querySelectorAll('.ib-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.setAttribute('aria-current','page');
      if (href === '/' && path === '/') a.setAttribute('aria-current','page');
    });

    // Insert at top of body
    document.body.insertAdjacentElement('afterbegin', tmp.firstElementChild);
  } catch (e) {
    // Silent fail: page still works without header
    console.warn(e);
  }
})();
</script>

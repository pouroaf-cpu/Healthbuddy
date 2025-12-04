document.addEventListener('DOMContentLoaded', async () => {
  const shell = document.getElementById('ib-guides-shell');
  if (!shell) return; // only on guides pages

  try {
    const res = await fetch('/assets/guides-nav.html');
    if (!res.ok) throw new Error('Failed to load guides-nav.html');

    const html = await res.text();
    shell.innerHTML = html;

    initInjectBuddyGuidesNav(shell);
  } catch (err) {
    console.error('InjectBuddy guides nav failed:', err);
  }
});

function initInjectBuddyGuidesNav(root) {
  const rail = root.querySelector('.ib-guides-rail');
  const panel = root.querySelector('.ib-guides-panel');
  if (!rail || !panel) return;

  const iconButtons = Array.from(
    rail.querySelectorAll('.ib-guides-icon-btn')
  );
  const groups = Array.from(
    panel.querySelectorAll('.ib-guides-panel-group')
  );

  function setActiveCategory(category) {
    iconButtons.forEach((btn) => {
      btn.classList.toggle(
        'is-active',
        btn.dataset.category === category
      );
    });

    groups.forEach((group) => {
      group.classList.toggle(
        'is-active',
        group.dataset.category === category
      );
    });

    panel.dataset.state = 'open';
  }

  // Initial state: first button
  if (iconButtons.length && groups.length) {
    const initialCategory = iconButtons[0].dataset.category;
    setActiveCategory(initialCategory);
  }

  iconButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const category = btn.dataset.category;
      const alreadyActive = btn.classList.contains('is-active');
      const panelOpen = panel.dataset.state === 'open';

      // Click active icon while open -> collapse
      if (alreadyActive && panelOpen) {
        panel.dataset.state = 'closed';
        btn.classList.remove('is-active');
        return;
      }

      // Otherwise open/switch
      setActiveCategory(category);
    });
  });

  // Click outside -> close panel
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !rail.contains(e.target)) {
      panel.dataset.state = 'closed';
      iconButtons.forEach((btn) => btn.classList.remove('is-active'));
    }
  });
}
// ===============================
// Guides toolbar behaviour
// - Desktop: panel shows while hovering toolbar (CSS handles this)
// - Mobile: tap icon to open, tap outside to close
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const navWrap = document.querySelector('.ib-guides-nav-wrap');
  if (!navWrap) return; // only run on guide pages

  const panel = navWrap.querySelector('.ib-guides-panel');
  const iconButtons = navWrap.querySelectorAll('.ib-guides-icon-btn');
  const groups = navWrap.querySelectorAll('.ib-guides-panel-group');

  function isDesktop() {
    return window.matchMedia('(min-width: 901px)').matches;
  }

  function openPanel() {
    if (!panel) return;
    panel.setAttribute('data-state', 'open');
    navWrap.classList.add('ib-guides-open');
  }

  function closePanel() {
    if (!panel) return;
    panel.setAttribute('data-state', 'closed');
    navWrap.classList.remove('ib-guides-open');
  }

  function activateGroup(groupId) {
    groups.forEach(g => {
      g.classList.toggle('is-active', g.dataset.group === groupId);
    });
  }

  // Clicking an icon: pick group +

// ✅ TURN GUIDES ON / OFF HERE
const IB_ACTIVE_GUIDES = new Set([
  'bloodwork',
  'testosterone',
  // 'hormones',
  // 'peptides',
  // 'injections',
  // 'calculators',
]);

document.addEventListener('DOMContentLoaded', () => {
  hideInactiveGuides(document);
});

function hideInactiveGuides(root) {
  // Sidebar buttons
  root.querySelectorAll('.ib-guides-icon-btn').forEach(btn => {
    const key = btn.dataset.category;
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      btn.remove();
    }
  });

  // Sidebar content groups
  root.querySelectorAll('.ib-guides-panel-group').forEach(group => {
    const key = group.dataset.category;
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      group.remove();
    }
  });

  // Top nav links
  root.querySelectorAll('[data-guide-link]').forEach(link => {
    const key = link.dataset.guideLink;
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      const li = link.closest('li');
      li ? li.remove() : link.remove();
    }
  });
}

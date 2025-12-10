// ✅ ONLY THESE CATEGORIES ARE VISIBLE
//   - in the SIDE BAR
//   - and in the TOP NAV (if you tag links, see below)
const IB_ACTIVE_GUIDES = new Set([
  'bloodwork',
  'testosterone',
  // 'hormones',
  // 'peptides',
  // 'injection',
  // 'tools',
]);

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1) TOP NAV: hide unused guide links ----
  // Add data-guide-link="bloodwork" etc. on your main nav links.
  const topNavLinks = document.querySelectorAll('[data-guide-link]');
  topNavLinks.forEach((link) => {
    const key = link.dataset.guideLink; // e.g. "bloodwork"
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      const li = link.closest('li');
      if (li) {
        li.remove();
      } else {
        link.remove();
      }
    }
  });

  // ---- 2) GUIDES SIDEBAR: only on pages with #ib-guides-shell ----
  const shell = document.getElementById('ib-guides-shell');
  if (!shell) return; // no guides shell on this page

  // Inject the full nav markup directly
  shell.innerHTML = `
    <div class="ib-guides-nav-wrap" aria-label="Guide categories">
      <!-- ICON RAIL -->
      <aside class="ib-guides-rail">
        <!-- Bloodwork -->
        <button class="ib-guides-icon-btn" data-category="bloodwork" aria-label="Bloodwork guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <path d="M32 8c-5 9-14 16-14 26a14 14 0 0 0 28 0C46 24 37 17 32 8z" />
            </g>
          </svg>
        </button>

        <!-- Hormones -->
        <button class="ib-guides-icon-btn" data-category="hormones" aria-label="Hormones &amp; health basics guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <path d="M22 10c4 6 10 8 20 8" />
              <path d="M22 54c4-6 10-8 20-8" />
              <path d="M22 18c-4 6-4 12 0 18s4 12 0 18" />
              <path d="M42 18c4 6 4 12 0 18s-4 12 0 18" />
              <line x1="24" y1="22" x2="40" y2="22" />
              <line x1="24" y1="30" x2="40" y2="30" />
              <line x1="24" y1="38" x2="40" y2="38" />
              <line x1="24" y1="46" x2="40" y2="46" />
            </g>
          </svg>
        </button>

        <!-- Testosterone -->
        <button class="ib-guides-icon-btn" data-category="testosterone" aria-label="Testosterone guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <rect x="24" y="10" width="16" height="6" rx="2" />
              <path d="M26 16h12v4H26z" />
              <rect x="22" y="20" width="20" height="30" rx="4" />
              <path d="M24 30h16" />
            </g>
          </svg>
        </button>

        <!-- Peptides -->
        <button class="ib-guides-icon-btn" data-category="peptides" aria-label="Peptide guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <rect x="24" y="8" width="16" height="6" rx="2" />
              <path d="M24 14h16v4H24z" />
              <rect x="22" y="18" width="20" height="28" rx="10" />
              <path d="M24 30c4 2 8 3 12 3" />
            </g>
          </svg>
        </button>

        <!-- Injection -->
        <button class="ib-guides-icon-btn" data-category="injection" aria-label="Injection technique &amp; safety guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <path d="M18 18 40 40" />
              <rect x="28" y="10" width="10" height="12" transform="rotate(45 33 16)" />
              <path d="M42 42 48 48" />
              <path d="M48 48 44 56" />
              <line x1="22" y1="22" x2="30" y2="30" />
            </g>
          </svg>
        </button>

        <!-- Tools / calculators -->
        <button class="ib-guides-icon-btn" data-category="tools" aria-label="Tools &amp; calculators guides">
          <svg class="ib-guides-icon" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <rect x="20" y="10" width="24" height="44" rx="4" />
              <rect x="24" y="14" width="16" height="8" rx="2" />
              <circle cx="26" cy="30" r="1.8" />
              <circle cx="34" cy="30" r="1.8" />
              <circle cx="42" cy="30" r="1.8" />
              <circle cx="26" cy="38" r="1.8" />
              <circle cx="34" cy="38" r="1.8" />
              <circle cx="42" cy="38" r="1.8" />
              <circle cx="26" cy="46" r="1.8" />
              <circle cx="34" cy="46" r="1.8" />
            </g>
          </svg>
        </button>
      </aside>

      <!-- SLIDE-OUT PANEL -->
      <aside class="ib-guides-panel" data-state="closed">
        <!-- Bloodwork -->
        <div class="ib-guides-panel-group" data-category="bloodwork">
          <h2>Bloodwork</h2>
          <ul>
            <li><a href="/Bloodwork/index.html">Bloodwork category overview</a></li>
            <li><a href="/guides/bloodwork/basics.html">Bloodwork basics for TRT</a></li>
            <li><a href="/guides/bloodwork/interpreting-labs.html">How to read common lab markers</a></li>
            <li><a href="/guides/bloodwork/pre-injection.html">Pre-injection bloodwork checklist</a></li>
          </ul>
        </div>

        <!-- Hormones & health basics -->
        <div class="ib-guides-panel-group" data-category="hormones">
          <h2>Hormones &amp; health basics</h2>
          <ul>
            <li><a href="/HormonesHealthBasics/index.html">Hormones &amp; health basics overview</a></li>
            <li><a href="/guides/hormones/what-is-trt.html">What is TRT?</a></li>
            <li><a href="/guides/hormones/side-effects.html">Common side effects &amp; monitoring</a></li>
            <li><a href="/guides/hormones/lifestyle.html">Lifestyle factors that move the needle</a></li>
          </ul>
        </div>

        <!-- Testosterone -->
        <div class="ib-guides-panel-group" data-category="testosterone">
          <h2>Testosterone</h2>
          <ul>
            <li><a href="/Testosterone/index.html">Testosterone category overview</a></li>
            <li><a href="/guides/testosterone/dose-planning.html">Dose planning basics</a></li>
            <li><a href="/guides/testosterone/frequency-options.html">Weekly vs every N days</a></li>
          </ul>
        </div>

        <!-- Peptides -->
        <div class="ib-guides-panel-group" data-category="peptides">
          <h2>Peptides</h2>
          <ul>
            <li><a href="/Peptides/index.html">Peptides category overview</a></li>
            <li><a href="/guides/peptides/reconstitution.html">Peptide reconstitution basics</a></li>
            <li><a href="/guides/peptides/storage.html">Storage &amp; handling</a></li>
          </ul>
        </div>

        <!-- Injection technique & safety -->
        <div class="ib-guides-panel-group" data-category="injection">
          <h2>Injection technique &amp; safety</h2>
          <ul>
            <li><a href="/InjectionTechniqueSafety/index.html">Injection technique overview</a></li>
            <li><a href="/guides/injection/basics.html">Injection basics</a></li>
            <li><a href="/guides/injection/site-rotation.html">Site rotation &amp; safety</a></li>
          </ul>
        </div>

        <!-- Tools & calculators -->
        <div class="ib-guides-panel-group" data-category="tools">
          <h2>Tools &amp; calculators</h2>
          <ul>
            <li><a href="/Tools/index.html">Tools &amp; calculators overview</a></li>
            <li><a href="/guides/tools/trt-calculator.html">How to use the TRT dosage calculator</a></li>
            <li><a href="/guides/tools/peptide-calculator.html">How to use the peptide calculator</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `;

  const navWrap = shell.querySelector('.ib-guides-nav-wrap');
  const rail = navWrap.querySelector('.ib-guides-rail');
  const panel = navWrap.querySelector('.ib-guides-panel');

  const iconButtons = Array.from(
    rail.querySelectorAll('.ib-guides-icon-btn')
  );
  const groups = Array.from(
    panel.querySelectorAll('.ib-guides-panel-group')
  );

  // ---- 3) HIDE INACTIVE CATEGORIES IN SIDEBAR ----
  iconButtons.forEach((btn) => {
    const key = btn.dataset.category; // bloodwork, hormones, etc.
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      btn.remove();
    }
  });

  groups.forEach((group) => {
    const key = group.dataset.category;
    if (key && !IB_ACTIVE_GUIDES.has(key)) {
      group.remove();
    }
  });

  // Rebuild the arrays AFTER removals
  const activeButtons = Array.from(
    rail.querySelectorAll('.ib-guides-icon-btn')
  );
  const activeGroups = Array.from(
    panel.querySelectorAll('.ib-guides-panel-group')
  );

  function setActiveCategory(category) {
    // buttons
    activeButtons.forEach((btn) => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // panels
    activeGroups.forEach((group) => {
      const match = group.dataset.category === category;
      group.classList.toggle('is-active', match);
      group.hidden = !match;
      group.setAttribute('aria-hidden', match ? 'false' : 'true');
    });

    panel.dataset.state = 'open';
    navWrap.classList.add('ib-guides-open');
  }

  function closePanel() {
    panel.dataset.state = 'closed';
    navWrap.classList.remove('ib-guides-open');

    activeButtons.forEach((btn) => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    });

    activeGroups.forEach((group) => {
      group.classList.remove('is-active');
      group.hidden = true;
      group.setAttribute('aria-hidden', 'true');
    });
  }

  // Initial state: everything closed
  closePanel();

  // Icon click behaviour (toggle open/close)
  activeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const category = btn.dataset.category;
      const alreadyActive = btn.classList.contains('is-active');
      const panelOpen = panel.dataset.state === 'open';

      if (alreadyActive && panelOpen) {
        // Clicking active icon closes panel
        closePanel();
        return;
      }

      setActiveCategory(category);
    });
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !rail.contains(e.target)) {
      closePanel();
    }
  });
});

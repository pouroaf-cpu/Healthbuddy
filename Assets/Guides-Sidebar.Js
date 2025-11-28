document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-guides-sidebar]');
  if (!container) return;

  // 1) Inject the shared sidebar markup
  container.innerHTML = `
    <!-- Bloodwork -->
    <section class="ib-guides-cat" data-cat="bloodwork">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- BLOODWORK: drop -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <path d="M32 8c-5 9-14 16-14 26a14 14 0 0 0 28 0C46 24 37 17 32 8z" />
            </g>
          </svg>
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Bloodwork</span>
            <span class="ib-guides-cat-current">→ Bloodwork basics for TRT</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▾</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/Bloodwork/index.html" class="ib-guides-cat-link" data-path="/Bloodwork/index.html">
          Bloodwork category overview
        </a>
        <a href="/guides/bloodwork/basics.html" class="ib-guides-cat-link" data-path="/guides/bloodwork/basics.html">
          Bloodwork basics for TRT
        </a>
        <a href="/guides/bloodwork/interpreting-labs.html" class="ib-guides-cat-link" data-path="/guides/bloodwork/interpreting-labs.html">
          How to read common lab markers
        </a>
        <a href="/guides/bloodwork/pre-injection.html" class="ib-guides-cat-link" data-path="/guides/bloodwork/pre-injection.html">
          Pre-injection bloodwork checklist
        </a>
      </div>
    </section>

    <!-- Hormones & Health basics -->
    <section class="ib-guides-cat" data-cat="hormones">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- HORMONES: DNA helix -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
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
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Hormones &amp; health basics</span>
            <span class="ib-guides-cat-current">→ What is TRT?</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▸</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/HormonesHealthBasics/index.html" class="ib-guides-cat-link" data-path="/HormonesHealthBasics/index.html">
          Hormones &amp; health basics overview
        </a>
        <a href="/guides/hormones/what-is-trt.html" class="ib-guides-cat-link" data-path="/guides/hormones/what-is-trt.html">
          What is TRT?
        </a>
        <a href="/guides/hormones/side-effects.html" class="ib-guides-cat-link" data-path="/guides/hormones/side-effects.html">
          Common side effects &amp; monitoring
        </a>
        <a href="/guides/hormones/lifestyle.html" class="ib-guides-cat-link" data-path="/guides/hormones/lifestyle.html">
          Lifestyle factors that move the needle
        </a>
      </div>
    </section>

    <!-- Testosterone -->
    <section class="ib-guides-cat" data-cat="testosterone">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- TESTOSTERONE: TRT vial -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <rect x="24" y="10" width="16" height="6" rx="2" />
              <path d="M26 16h12v4H26z" />
              <rect x="22" y="20" width="20" height="30" rx="4" />
              <path d="M24 30h16" />
            </g>
          </svg>
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Testosterone</span>
            <span class="ib-guides-cat-current">→ Dose planning basics</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▸</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/Testosterone/index.html" class="ib-guides-cat-link" data-path="/Testosterone/index.html">
          Testosterone category overview
        </a>
        <a href="/guides/testosterone/dose-planning.html" class="ib-guides-cat-link" data-path="/guides/testosterone/dose-planning.html">
          Dose planning basics
        </a>
        <a href="/guides/testosterone/frequency-options.html" class="ib-guides-cat-link" data-path="/guides/testosterone/frequency-options.html">
          Weekly vs every N days
        </a>
      </div>
    </section>

    <!-- Peptides -->
    <section class="ib-guides-cat" data-cat="peptides">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- PEPTIDES: peptide vial -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <rect x="24" y="8" width="16" height="6" rx="2" />
              <path d="M24 14h16v4H24z" />
              <rect x="22" y="18" width="20" height="28" rx="10" />
              <path d="M24 30c4 2 8 3 12 3" />
            </g>
          </svg>
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Peptides</span>
            <span class="ib-guides-cat-current">→ Reconstitution basics</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▸</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/Peptides/index.html" class="ib-guides-cat-link" data-path="/Peptides/index.html">
          Peptides category overview
        </a>
        <a href="/guides/peptides/reconstitution.html" class="ib-guides-cat-link" data-path="/guides/peptides/reconstitution.html">
          Peptide reconstitution basics
        </a>
        <a href="/guides/peptides/storage.html" class="ib-guides-cat-link" data-path="/guides/peptides/storage.html">
          Storage &amp; handling
        </a>
      </div>
    </section>

    <!-- Injection technique & safety -->
    <section class="ib-guides-cat" data-cat="injection">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- INJECTION: needle -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
            <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
              <path d="M18 18 40 40" />
              <rect x="28" y="10" width="10" height="12" transform="rotate(45 33 16)" />
              <path d="M42 42 48 48" />
              <path d="M48 48 44 56" />
              <line x1="22" y1="22" x2="30" y2="30" />
            </g>
          </svg>
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Injection technique &amp; safety</span>
            <span class="ib-guides-cat-current">→ Injection basics</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▸</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/InjectionTechniqueSafety/index.html" class="ib-guides-cat-link" data-path="/InjectionTechniqueSafety/index.html">
          Injection technique overview
        </a>
        <a href="/guides/injection/basics.html" class="ib-guides-cat-link" data-path="/guides/injection/basics.html">
          Injection basics
        </a>
        <a href="/guides/injection/site-rotation.html" class="ib-guides-cat-link" data-path="/guides/injection/site-rotation.html">
          Site rotation &amp; safety
        </a>
      </div>
    </section>

    <!-- Tools & calculators -->
    <section class="ib-guides-cat" data-cat="tools">
      <button class="ib-guides-cat-toggle" type="button" aria-expanded="false">
        <div class="ib-guides-cat-main">
          <!-- TOOLS: calculator -->
          <svg class="ib-guides-cat-img" viewBox="0 0 64 64" aria-hidden="true" role="img">
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
          <div class="ib-guides-cat-text">
            <span class="ib-guides-cat-label">Tools &amp; calculators</span>
            <span class="ib-guides-cat-current">→ How to use the TRT calculator</span>
          </div>
        </div>
        <span class="ib-guides-cat-icon">▸</span>
      </button>

      <div class="ib-guides-cat-panel" hidden>
        <a href="/Tools/index.html" class="ib-guides-cat-link" data-path="/Tools/index.html">
          Tools &amp; calculators overview
        </a>
        <a href="/guides/tools/trt-calculator.html" class="ib-guides-cat-link" data-path="/guides/tools/trt-calculator.html">
          How to use the TRT dosage calculator
        </a>
        <a href="/guides/tools/peptide-calculator.html" class="ib-guides-cat-link" data-path="/guides/tools/peptide-calculator.html">
          How to use the peptide calculator
        </a>
      </div>
    </section>
  `;

  // 2) Highlight active link based on current URL
  const path = window.location.pathname.replace(/\/+$/, ''); // strip trailing slash
  const links = container.querySelectorAll('.ib-guides-cat-link');

  let activeLink = null;

  links.forEach(link => {
    const linkPath = (link.getAttribute('data-path') || link.getAttribute('href') || '').replace(/\/+$/, '');
    if (linkPath && path.endsWith(linkPath)) {
      activeLink = link;
    }
  });

  if (activeLink) {
    activeLink.classList.add('is-active');

    const cat = activeLink.closest('.ib-guides-cat');
    const btn = cat.querySelector('.ib-guides-cat-toggle');
    const panel = cat.querySelector('.ib-guides-cat-panel');

    // open that category
    cat.classList.add('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (panel) panel.hidden = false;
  } else {
    // default: open Bloodwork
    const first = container.querySelector('.ib-guides-cat[data-cat="bloodwork"]');
    if (first) {
      const btn = first.querySelector('.ib-guides-cat-toggle');
      const panel = first.querySelector('.ib-guides-cat-panel');
      first.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (panel) panel.hidden = false;
    }
  }

  // 3) Accordion behaviour (only one open at a time)
  const cats = container.querySelectorAll('.ib-guides-cat');

  cats.forEach(cat => {
    const btn = cat.querySelector('.ib-guides-cat-toggle');
    const panel = cat.querySelector('.ib-guides-cat-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = cat.classList.contains('is-open');

      cats.forEach(other => {
        const ob = other.querySelector('.ib-guides-cat-toggle');
        const op = other.querySelector('.ib-guides-cat-panel');
        if (!ob || !op) return;
        other.classList.remove('is-open');
        ob.setAttribute('aria-expanded', 'false');
        op.hidden = true;
      });

      if (!isOpen) {
        cat.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
});

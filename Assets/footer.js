document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('ib-footer');
  if (!target) return;

  target.innerHTML = `
    <footer class="ib-footer">
      <div class="ib-footer-inner">
        <!-- Brand -->
        <div class="ib-footer-col ib-footer-brand">
          <a href="/" class="ib-footer-logo">
            <span class="ib-footer-logo-mark">IB</span>
            <span class="ib-footer-logo-text">InjectBuddy</span>
          </a>
          <p class="ib-footer-tagline">
            Fast, no-nonsense tools for TRT, peptides, and hormone dosing.
          </p>
        </div>

        <!-- Tools -->
        <div class="ib-footer-col">
          <strong class="ib-footer-heading">Tools</strong>
          <ul class="ib-footer-links">
            <li><a href="/calculator.html">TRT dosage calculator</a></li>
            <li><a href="/peptide.html">Peptide reconstitution / dosage</a></li>
            <li><a href="/free-testosterone-calculator.html">Free T calculator</a></li>
            <li><a href="/bmi.html">BMI calculator</a></li>
            <li><a href="/embed.html">Embed InjectBuddy</a></li>
          </ul>
        </div>

        <!-- Site -->
        <div class="ib-footer-col">
          <strong class="ib-footer-heading">Site</strong>
          <ul class="ib-footer-links">
            <li><a href="/about.html">About</a></li>
            <li><a href="/guides.html">Guides</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/privacy.html">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div class="ib-footer-bottom">
        <p class="ib-footer-copy">
          © ${new Date().getFullYear()} InjectBuddy · For planning only — not medical advice.
        </p>
      </div>
    </footer>
  `;
});

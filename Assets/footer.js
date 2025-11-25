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

      <!-- DISCLAIMER ABOVE THE LINE -->
      <p class="ib-footer-disclaimer">
        © ${new Date().getFullYear()} InjectBuddy · For planning only — not medical advice.
      </p>

      <!-- NEW LINE ABOVE BOTTOM FOOTER -->
      <div class="ib-footer-separator"></div>

      <div class="ib-footer-bottom">
        <div class="ib-footer-social">
          <a href="https://www.reddit.com" aria-label="Reddit" class="ib-social-icon">
            <svg viewBox="0 0 24 24"><path fill="white" d="M12 2c5.523 0 10 3.582 10 8s-4.477 8-10 8-10-3.582-10-8 4.477-8 10-8zm6.166 6.25a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3zm-10.332 0a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3zM12 16.3c2.06 0 3.75-1.07 3.75-2.4 0-.33-.27-.6-.6-.6-.19 0-.36.09-.47.22-.48.57-1.44.94-2.68.94-1.25 0-2.21-.37-2.68-.94a.63.63 0 0 0-.47-.22c-.33 0-.6.27-.6.6 0 1.33 1.69 2.4 3.75 2.4z"/></svg>
          </a>

          <a href="https://www.facebook.com" aria-label="Facebook" class="ib-social-icon">
            <svg viewBox="0 0 24 24"><path fill="white" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12"/></svg>
          </a>

          <a href="https://www.instagram.com" aria-label="Instagram" class="ib-social-icon">
            <svg viewBox="0 0 24 24"><path fill="white" d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm4.8-8.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/></svg>
          </a>

          <a href="https://www.twitter.com" aria-label="Twitter" class="ib-social-icon">
            <svg viewBox="0 0 24 24"><path fill="white" d="M22 5.8c-.8.4-1.7.6-2.6.8a4.4 4.4 0 0 0-7.6 3v.7A12.3 12.3 0 0 1 3 4.9s-4 9 5 13c-2.3 1.5-5.2 1.7-7.7 1.2 4 2.6 14 2.8 18.3-5A9 9 0 0 0 22 5.8z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  `;
});

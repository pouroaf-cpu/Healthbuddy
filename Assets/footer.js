<script>
// assets/footer.js
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('ib-footer');
  if (!target) return;

  target.innerHTML = `
    <footer class="ib-footer">
      <div class="ib-footer-inner">
        <!-- Column 1: Brand -->
        <div class="ib-footer-col ib-footer-brand">
          <a href="/" class="ib-footer-logo">
            <span class="ib-footer-logo-mark">IB</span>
            <span class="ib-footer-logo-text">InjectBuddy</span>
          </a>
          <p class="ib-footer-copy">
            No-nonsense tools for TRT, peptides, and hormone health. Free, fast, mobile-first.
          </p>
        </div>

        <!-- Column 2: Tools -->
        <div class="ib-footer-col">
          <h3 class="ib-footer-heading">Tools</h3>
          <ul class="ib-footer-links">
            <li><a href="/calculator.html">Testosterone dosage calculator</a></li>
            <li><a href="/peptide.html">Peptide dosage &amp; reconstitution</a></li>
            <li><a href="/bmi.html">BMI calculator</a></li>
            <li><a href="/free-test.html">Free testosterone calculator</a></li>
            <li><a href="/embed.html">Embed InjectBuddy</a></li>
          </ul>
        </div>

        <!-- Column 3: Site -->
        <div class="ib-footer-col">
          <h3 class="ib-footer-heading">Site</h3>
          <ul class="ib-footer-links">
            <li><a href="/about.html">About</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/faq.html">FAQ</a></li>
          </ul>
        </div>

        <!-- Column 4: Legal -->
        <div class="ib-footer-col">
          <h3 class="ib-footer-heading">Legal</h3>
          <ul class="ib-footer-links">
            <li><a href="/disclaimer.html">Medical disclaimer</a></li>
            <li><a href="/terms.html">Terms of use</a></li>
            <li><a href="/privacy.html">Privacy policy</a></li>
          </ul>
        </div>
      </div>

      <div class="ib-footer-bottom">
        <p class="ib-footer-bottom-text">
          &copy; ${new Date().getFullYear()} InjectBuddy. For educational use only — not medical advice.
        </p>
        <p class="ib-footer-bottom-text">
          Built for lifters, patients, and nerds who are tired of bad calculators.
        </p>
      </div>
    </footer>
  `;
});
</script>

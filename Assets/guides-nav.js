(function () {
  const PLACEHOLDER_ID = "ib-guides-nav";
  const NAV_HTML_PATH = "/assets/guides-nav.html";

  // Controls which category + link is highlighted/opened.
  // Add these to <body> on each page:
  //   data-guides-cat="hormones"
  //   data-guides-active="hormones:overview"
  function getActiveConfig() {
    const b = document.body;
    return {
      cat: (b.getAttribute("data-guides-cat") || "").trim(),
      active: (b.getAttribute("data-guides-active") || "").trim()
    };
  }

  function closeAll(cats) {
    cats.forEach(cat => {
      const btn = cat.querySelector(".ib-guides-cat-toggle");
      const panel = cat.querySelector(".ib-guides-cat-panel");
      const icon = cat.querySelector(".ib-guides-cat-icon");
      if (!btn || !panel) return;

      cat.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      if (icon) icon.textContent = "▸";
    });
  }

  function openCat(cat) {
    const btn = cat.querySelector(".ib-guides-cat-toggle");
    const panel = cat.querySelector(".ib-guides-cat-panel");
    const icon = cat.querySelector(".ib-guides-cat-icon");
    if (!btn || !panel) return;

    cat.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    if (icon) icon.textContent = "▾";
  }

  function setActiveLink(root, activeKey) {
    const links = root.querySelectorAll(".ib-guides-cat-link");
    links.forEach(a => {
      const k = a.getAttribute("data-guide") || "";
      if (k === activeKey) a.classList.add("is-active");
      else a.classList.remove("is-active");
    });
  }

  function syncCurrentText(root, activeCat, activeKey) {
    // Optional: update the small "→ ..." line if active is known.
    // If activeKey missing, we leave defaults in HTML.
    if (!activeCat || !activeKey) return;

    const activeLink = root.querySelector(`.ib-guides-cat-link[data-guide="${CSS.escape(activeKey)}"]`);
    const current = root.querySelector(`[data-current-for="${CSS.escape(activeCat)}"]`);
    if (activeLink && current) current.textContent = "→ " + activeLink.textContent.trim();
  }

  function wireAccordion(root) {
    const cats = Array.from(root.querySelectorAll(".ib-guides-cat"));

    cats.forEach(cat => {
      const btn = cat.querySelector(".ib-guides-cat-toggle");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = cat.classList.contains("is-open");

        closeAll(cats);
        if (!isOpen) openCat(cat);
      });
    });

    return cats;
  }

  async function inject() {
    const mount = document.getElementById(PLACEHOLDER_ID);
    if (!mount) return;

    const res = await fetch(NAV_HTML_PATH, { cache: "no-cache" });
    if (!res.ok) return;

    const html = await res.text();
    mount.innerHTML = html;

    const root = mount.querySelector(".ib-guides-nav");
    if (!root) return;

    const { cat: activeCat, active: activeKey } = getActiveConfig();

    const cats = wireAccordion(root);

    // Default behavior: if nothing specified, open first category.
    // If specified, open that category.
    if (activeCat) {
      const match = root.querySelector(`.ib-guides-cat[data-cat="${CSS.escape(activeCat)}"]`);
      if (match) {
        closeAll(cats);
        openCat(match);
      }
    } else if (cats[0]) {
      closeAll(cats);
      openCat(cats[0]);
    }

    if (activeKey) setActiveLink(root, activeKey);
    if (activeCat && activeKey) syncCurrentText(root, activeCat, activeKey);
  }

  document.addEventListener("DOMContentLoaded", inject);
})();

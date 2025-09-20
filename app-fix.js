// Safe by default; optional sanitizer via DOMPurify when toggle is on.
(() => {
  const out = document.getElementById("safeOut");
  const input = document.getElementById("safeInput");
  const allow = document.getElementById("allowHtml");
  const msg = document.getElementById("safeMsg");

  const OPTS = {
    ALLOWED_TAGS: ["b", "i", "u", "strong", "em", "br", "a"],
    ALLOWED_ATTR: ["href", "title"],
  };

  function showInfo(text, cls = "alert-info") {
    msg.className = `alert ${cls} mt-3`; // reset classes
    msg.textContent = text;
    msg.classList.remove("d-none");
  }

  function renderSanitized(html) {
    const clean = DOMPurify.sanitize(html, OPTS);
    out.innerHTML = clean;
    out.querySelectorAll("a").forEach(a => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    if (clean !== html) {
      showInfo("Sanitizer removed or adjusted unsafe HTML. Rendering sanitized output.", "alert-warning");
    } else {
      showInfo("Rendered with sanitizer. No unsafe HTML detected.");
    }
  }

  document.getElementById("form-safe").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    if (!allow.checked) {
      out.textContent = "Echo (encoded): " + v; // SAFE
      showInfo("Rendered as plain text using textContent.");
      return;
    }
    renderSanitized(v);
  });
})();

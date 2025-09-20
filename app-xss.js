// Educational use only. Intentionally vulnerable.
(() => {
  const out = document.getElementById("xssOut");
  const input = document.getElementById("xssInput");
  const msg = document.getElementById("xssMsg");

  function showWarn(text) {
    msg.textContent = text;
    msg.classList.remove("d-none");
  }

  function render(v) {
    out.innerHTML = "Echo: " + v; // VULNERABLE
    showWarn("Warning: untrusted input was injected with innerHTML (vulnerable to XSS).");
  }

  const q = new URLSearchParams(location.search).get("q");
  if (q !== null) {
    input.value = q;
    render(q);
  }

  document.getElementById("form-xss").addEventListener("submit", (e) => {
    e.preventDefault();
    render(input.value);
  });
})();

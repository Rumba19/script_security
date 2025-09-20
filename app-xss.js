// Educational use only. Intentionally vulnerable.

(function () {
  const out = document.getElementById("xssOut");
  const input = document.getElementById("xssInput");

  // Populate from ?q= if present
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  if (q !== null) {
    // VULNERABILITY: untrusted HTML injection
    out.innerHTML = "Echo: " + q;
    input.value = q;
  }

  // Submit handler
  document.getElementById("form-xss").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    // VULNERABILITY: untrusted HTML injection
    out.innerHTML = "Echo: " + v;
  });
})();

// Educational use only. Intentionally vulnerable.
(function () {
  const out = document.getElementById("xssOut");
  const input = document.getElementById("xssInput");

  const q = new URLSearchParams(location.search).get("q");
  if (q !== null) {
    out.innerHTML = "Echo: " + q; // VULNERABLE
    input.value = q;
  }

  document.getElementById("form-xss").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    out.innerHTML = "Echo: " + v;     // VULNERABLE
  });
})();

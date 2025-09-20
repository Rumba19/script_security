// Safe pattern: never use innerHTML for untrusted data.
(function () {
  const out = document.getElementById("safeOut");
  const input = document.getElementById("safeInput");

  document.getElementById("form-safe").addEventListener("submit", (e) => {
    e.preventDefault();
    out.textContent = "Echo (encoded): " + input.value; // SAFE
  });
})();

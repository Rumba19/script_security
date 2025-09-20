// Intentionally unsafe. Demonstrates runtime code execution risks.
(() => {
  const out = document.getElementById("evalOut");
  const msg = document.getElementById("evalMsg");

  function warn(t){ msg.textContent=t; msg.classList.remove("d-none"); }

  document.getElementById("form-eval").addEventListener("submit", (e) => {
    e.preventDefault();
    const expr = document.getElementById("evalExpr").value;
    try {
      const r = eval(expr); // VULNERABLE
      out.textContent = "eval result: " + String(r);
      warn("Warning: eval executed attacker-controlled input.");
    } catch (err) {
      out.textContent = "eval error: " + err;
      warn("Warning: attempted to execute attacker-controlled code with eval.");
    }
  });

  document.getElementById("form-func").addEventListener("submit", (e) => {
    e.preventDefault();
    const body = document.getElementById("funcBody").value;
    try {
      const fn = new Function(body); // VULNERABLE
      const r = fn();
      out.textContent = "Function result: " + String(r);
      warn("Warning: new Function compiled and ran attacker-controlled code.");
    } catch (err) {
      out.textContent = "Function error: " + err;
      warn("Warning: attempted to compile attacker-controlled code with new Function.");
    }
  });
})();

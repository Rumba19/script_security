# Web Security Labs: XSS and Runtime `eval()` (with Mitigations)

Purpose: demonstrate two client-side vulnerabilities and show safe fixes.

## Structure
```
/ (static site)
├─ index.html      # Bootstrap UI with tabs
├─ app-xss.js      # Step 1: XSS via innerHTML (vulnerable)
├─ app-eval.js     # Step 2: dynamic eval/new Function (vulnerable)
└─ app-fix.js      # Step 3: safe patterns + DOMPurify option
```


## Step 1 — XSS (vulnerable)
UI tab: **1) XSS Injection (vulnerable)**

**Sink**
```js
// app-xss.js
out.innerHTML = "Echo: " + v; // vulnerable: untrusted HTML injection
```

**Test**
- Form: `<img src=x onerror=alert(1)>`
- URL: `?q=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`

## Step 2 — Dynamic eval (vulnerable)
UI tab: **2) Dynamic Eval (vulnerable)**

**Sinks**
```js
// app-eval.js
const r  = eval(expr);          // vulnerable
const fn = new Function(body);  // vulnerable
```

**Test**
- eval(): `2+2`, `alert("pwned")`
- new Function(): `return 7*6`, `alert("pwned")`

## Step 3 — Mitigations (safe)
UI tab: **3) Mitigation (safe)**

**Safe text rendering**
```js
// app-fix.js
out.textContent = "Echo (encoded): " + v; // safe
```

**Optional sanitized subset (DOMPurify)**
```js
const clean = DOMPurify.sanitize(v, {
  ALLOWED_TAGS: ["b","i","u","strong","em","br","a"],
  ALLOWED_ATTR: ["href","title"]
});
out.innerHTML = clean;
```

**Principles**
- Do not use `innerHTML` with untrusted data.
- If HTML is required, sanitize with a strict allowlist.
- Avoid `eval`, `new Function`, and string-based handlers/timers.

## Notes
- `index.html` loads Bootstrap, `app-xss.js`, `app-eval.js`, DOMPurify (CDN), and `app-fix.js`.
- Alerts in each tab describe what happened and why it’s (un)safe.

## Optional hardening
**CSP (server header)**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net/npm/dompurify/;
  script-src-attr 'none';
```

**ESLint**
```json
{
  "rules": {
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error"
  }
}
```

## Warning
This lab is intentionally insecure in vulnerable tabs. Use only in a controlled environment.

// Gates everything under /admin behind a login form. Cloudflare Access used
// to do this at the edge; replaced with a shared password + signed session
// cookie (see functions/api/_shared.ts) since Access's Zero Trust setup was
// more machinery than a single-admin, low-stakes content site needed.
import { hasValidSession, type Env } from '../api/_shared';

const LOGIN_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Admin login — Naprey Almario</title>
<style>
  :root { color-scheme: light; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: #f6f1ea;
    color: #1c1a17;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
  }
  form {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: min(90vw, 320px);
  }
  h1 { font-size: 1.1rem; margin: 0 0 1rem; }
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.6rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  button {
    width: 100%;
    padding: 0.6rem 0.75rem;
    border: none;
    border-radius: 8px;
    background: #be4e26;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
  #error { color: #b3261e; font-size: 0.85rem; min-height: 1.2em; margin: -0.25rem 0 0.5rem; }
</style>
</head>
<body>
  <form id="login-form">
    <h1>Admin login</h1>
    <input type="password" id="password" name="password" placeholder="Password" autofocus required />
    <p id="error"></p>
    <button type="submit">Log in</button>
  </form>
  <script>
    const form = document.getElementById('login-form');
    const error = document.getElementById('error');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.textContent = '';
      const password = document.getElementById('password').value;
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        location.reload();
      } else {
        error.textContent = 'Incorrect password.';
      }
    });
  </script>
</body>
</html>`;

export const onRequest = async (context: {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}): Promise<Response> => {
  const { request, env, next } = context;
  if (await hasValidSession(request, env)) {
    return next();
  }
  return new Response(LOGIN_PAGE, {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};

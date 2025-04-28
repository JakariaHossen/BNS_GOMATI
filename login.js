// login.js
import { supabase } from './auth.js';

const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const turnstileToken = document.querySelector('[name="cf-turnstile-response"]')?.value;

  if (!email || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!turnstileToken) {
    errorMessage.textContent = "Please complete the security challenge.";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorMessage.textContent = "Login failed: " + error.message;
    return;
  }

  // Login success
  window.location.href = "index.html";
});
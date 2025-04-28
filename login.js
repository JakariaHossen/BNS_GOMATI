import { supabase } from './auth.js';

const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (!email || !password) {
    showError("Please fill in all fields");
    return;
  }

  setLoadingState(true);
  
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      showError(error.message);
      return;
    }
    
    // Success - complete animation before redirect
    completeAnimation(() => {
      window.location.href = "index.html";
    });
    
  } catch (err) {
    showError("Connection error. Please try again.");
  } finally {
    if (!loginBtn.disabled) {
      setLoadingState(false);
    }
  }
});

function setLoadingState(isLoading) {
  loginBtn.disabled = isLoading;
  
  if (isLoading) {
    loginBtn.innerHTML = `
      <span class="progress-track"></span>
      <span class="progress-thumb"></span>
      <span class="btn-text">Verifying...</span>
    `;
    setTimeout(() => {
      document.querySelector('.progress-thumb').style.transform = 'translateX(100%)';
    }, 10);
  } else {
    resetLoginButton();
  }
}

function completeAnimation(callback) {
  const thumb = document.querySelector('.progress-thumb');
  thumb.style.transition = 'transform 0.3s ease-out';
  thumb.style.transform = 'translateX(100%)';
  
  setTimeout(callback, 300);
}

function resetLoginButton() {
  loginBtn.innerHTML = '<span class="btn-text">Login</span>';
}

function showError(message) {
  errorMessage.textContent = "Login failed: " + message;
  errorMessage.style.opacity = 1;
  
  // Auto-hide error after 5 seconds
  setTimeout(() => {
    errorMessage.style.opacity = 0;
  }, 5000);
  
  setLoadingState(false);
}
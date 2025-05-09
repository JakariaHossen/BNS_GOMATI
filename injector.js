import { protectPage } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  await protectPage();
  
  const protectedBody = document.getElementById('protected-body');
  if (protectedBody) {
    protectedBody.style.visibility = 'visible';
    protectedBody.style.opacity = '1';
  }
});
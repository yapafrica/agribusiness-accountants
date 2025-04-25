// Signup & Login Logic
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Signup
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      const user = { name, email, password };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Account created! Please login.');
      window.location.href = 'login.html';
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials!');
      }
    });
  }

  // Dashboard Protection + Progress Display
  if (window.location.pathname.includes('dashboard.html')) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html';
    }

    updateProgress();
  }
});

// Logout
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = 'login.html';
}

// Mark Module as Complete
function completeModule(moduleId) {
  const progress = JSON.parse(localStorage.getItem('progress')) || {};
  progress[moduleId] = true;
  localStorage.setItem('progress', JSON.stringify(progress));
  alert(`${moduleId} marked as complete!`);
  
  updateProgress();
}

// Show Progress in UI
function updateProgress() {
  const progress = JSON.parse(localStorage.getItem('progress')) || {};
  const totalModules = document.querySelectorAll('.feature').length;
  const completed = Object.keys(progress).length;
  const percent = Math.floor((completed / totalModules) * 100);

  const progressStatus = document.getElementById('progressStatus');
  const progressFill = document.getElementById('progressFill');

  if (progressStatus) {
    progressStatus.textContent = `You have completed ${completed} of ${totalModules} modules (${percent}%)`;
  }

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }
}

// Show/hide password
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}
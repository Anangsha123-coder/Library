function mockLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('loginMessage');

  // Mock credentials (replace with real DB/auth later)
  const validUser = 'anangsha';
  const validPass = '016';

  if (username === validUser && password === validPass) {
    message.style.color = 'lightgreen';
    message.textContent = 'Login Successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'index.html'; // Redirect to dashboard or main site
    }, 1500);
  } else {
    message.style.color = 'red';
    message.textContent = 'Invalid username or password.';
  }
}

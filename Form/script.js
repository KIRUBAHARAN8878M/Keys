// script.js
document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from submitting to a server

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation
  if (name === '' || email === '' || password === '') {
    displayMessage('All fields are required', 'error');
    return;
  }

  if (password.length < 6) {
    displayMessage('Password must be at least 6 characters', 'error');
    return;
  }

  displayMessage('Registration Successful', 'success');
});

// Function to display messages
function displayMessage(msg, type) {
  const message = document.getElementById('message');
  message.textContent = msg;
  message.style.color = type === 'error' ? 'red' : 'green';
}

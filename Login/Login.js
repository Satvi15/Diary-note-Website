// Get the input field elements
const usernameField = document.querySelector('input[name="username"]');
const passwordField = document.querySelector('input[name="password"]');

// Add event listener to the sign in button
const signInButton = document.querySelector('.btn');
signInButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  // Check if the username and password fields are not empty
  if (usernameField.value.trim() === '' || passwordField.value.trim() === '') {
    alert('Please enter your username and password.');
  } else {
    // Make an AJAX request to the login API endpoint
    // Replace the API_URL with the actual login API endpoint URL
    const API_URL = 'https://my-login-api.com/login';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      username: usernameField.value.trim(),
      password: passwordField.value.trim()
    }));
    xhr.onload = () => {
      if (xhr.status === 200) {
        alert('You are now logged in!');
        window.location.href = 'https://my-dashboard.com'; // Replace with the URL of the dashboard page
      } else {
        alert('Invalid username or password. Please try again.');
      }
    };
  }
});

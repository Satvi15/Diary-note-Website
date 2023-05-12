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
    // Replace the API_URL wit   h the actual login API endpoint URL
    const API_URL = '/login'; 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      mail: usernameField.value.trim(),
      password: passwordField.value.trim()
    }));
    xhr.onload = () => {
      if (xhr.status === 200) {
        window.location.pathname = '/home'; // Replace with the URL of the dashboard page
      } else {
        alert('Invalid username or password. Please try again.');
      }
    };
  }
});

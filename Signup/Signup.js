const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = form.elements['FirstName'].value.trim();
  const surName = form.elements['SurName'].value.trim();
  const email = form.elements['Email'].value.trim();
  const password = form.elements['password'].value.trim();
  const confirmPassword = form.elements['confirmPassword'].value.trim();
  const phone = form.elements['phone'].value.trim();
  const gender = form.elements['gender'].value.trim();

  if (!firstName || !surName || !email || !password || !confirmPassword || !phone || !gender) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // TODO: Add code to submit the form data to the server
});

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstName = form.elements['Firstname'].value.trim();
  let surName = form.elements['lastname'].value.trim();
  let email = form.elements['mail'].value.trim();
  let password = form.elements['password'].value.trim();
  let confirmpassword = form.elements['confirmpassword'].value.trim();
  let phone = form.elements['phoneNo'].value.trim();
  let gender = form.elements['gender'].value.trim();
  if (!firstName || !surName || !email || !password || !confirmpassword || !phone || !gender) {
    alert('Please fill in all fields');
    return;
  }

  if(password !== confirmpassword) {
    alert('Passwords do not match');
    return;
  }
  const API_URL = '/signup'; 
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(firstName.value)
  xhr.send(JSON.stringify({
    Firstname: firstName,
    lastname : surName,
    mail: email,
    phoneNo: phone,
    password: password,
    gender: gender,

  }));
  xhr.onload = () => {
    if (xhr.status === 200) {
      alert('You are now logged in!');
      window.location.pathname = '/'; // Replace with the URL of the dashboard page
      }else{
        alert("Email or password are already exists")
      }

//   // TODO: Add code to submit the form data to the server
    }});

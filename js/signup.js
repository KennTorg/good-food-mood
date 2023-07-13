const form = document.querySelector("#signupForm");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

function validateForm() {
  event.preventDefault();

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S\.\S+/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}

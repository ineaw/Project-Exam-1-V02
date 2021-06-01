const signUp = document.querySelector("#signup-email");
const signUpButton = document.querySelector(".signup");
const emailError = document.querySelector(".email-error");

function emailValidation() {
  if (validateEmail(signUp.value)) {
    signUpButton.innerHTML = "Signed up!";
    emailError.innerHTML = "";
    isValidated = true;
  } else {
    event.preventDefault();
    emailError.innerHTML = "<p>Please enter valid email address</p>";
    isvalidated = false;
  }
}

signUpButton.addEventListener("click", emailValidation);

function validateEmail(email) {
  const regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const validateEmail = regEx.test(email);

  return validateEmail;
}

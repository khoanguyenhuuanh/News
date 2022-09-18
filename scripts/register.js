"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const registerButton = document.getElementById("btn-submit");

//GET DATA FROM LOCAL DATABASE
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

//CHECK DATA VALIDATE
const validateDataInput = function (dataInput) {
  if (
    dataInput.firstName === "" ||
    dataInput.lastName === "" ||
    dataInput.username === "" ||
    dataInput.password === "" ||
    dataInput.passwordConfirm === ""
  ) {
    //CHECK FIRST NAME
    if (dataInput.firstName === "") {
      alert("Please input your First Name!");
    } //CHECK LAST NAME
    else if (dataInput.lastName === "") {
      alert("Please input your Last Name!");
    } //CHECK USERNAME
    else if (dataInput.username === "") {
      alert("Please input your Username!");
    } //CHECK PASSWORD
    else if (dataInput.password === "") {
      alert("Please input your Password!");
    } //CHECK CONFIRM PASSWORD
    else {
      alert("Please input confirm your password!");
    }
    return false;
  }
  //CHECK PASSWORD > 8 CHARACTERS
  if (dataInput.password.length < 8) {
    alert("Password at least 8 characters!");
    return false;
  } // CHECK PASSWORD && CONFIRM PASSWORD
  if (dataInput.password !== dataInput.passwordConfirm) {
    alert("Confirm your password wrong!");
    return false;
  }
  //CHECK USERNAME EXIST
  for (let i = 0; i < userArr.length; i++) {
    if (dataInput.username === userArr[i].username) {
      alert("Username already exist!");
      return false;
    }
  }
  return true;
};

//EVENT CLICK REGISTER
registerButton.addEventListener("click", function () {
  const dataInput = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
  };

  //CHECK DATA
  if (validateDataInput(dataInput)) {
    userArr.push(dataInput);
    saveToStorage(KEY, JSON.stringify(userArr));
    alert("Register Success!");
    window.location.href = "../pages/login.html";
  }
});

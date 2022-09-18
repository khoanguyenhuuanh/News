"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginButton = document.getElementById("btn-submit");

//GET DATA FROM DATABASE LOCAL
const KEY = "USER_ARRAY";
const KEY1 = "currentUser";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);

//PARSE JS Object --> Class Instance
for (let i = 0; i < userArr.length; i++) {
  userArr[i] = parseUser(userArr[i]);
}

//VALIDATE DATA LOGIN
const validateDataInput = function (dataInput) {
  if (dataInput.username === "") {
    //REQUIRED INPUT USERNAME
    alert("Please input your username!");
    return false;
  } else if (dataInput.password === "") {
    //REQUIRED INPUT PASSWORD
    alert("Please input your password!");
    return false;
  }
  //CHECK DATA USER FROM LOCAL DATABASE AND SAVE TO CURRENT USER LOGIN
  for (let i = 0; i < userArr.length; i++) {
    if (dataInput.username === userArr[i].username) {
      if (dataInput.password === userArr[i].password) {
        saveToStorage(KEY1, JSON.stringify(userArr[i]));
        console.log(JSON.parse(getFromStorage(KEY1)));
        alert("Login Success!");
        return true;
      } else {
        alert("Password Incorrect!");
        return false;
      }
    }
  }
  alert("Username does not exist!");
  return false;
};

// EVENT LOGIN
loginButton.addEventListener("click", function () {
  const dataInput = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  //VALIDATE DATA LOGIN
  if (validateDataInput(dataInput)) {
    console.log(JSON.parse(getFromStorage(KEY1)));
    window.location.href = "/index.html";
  }
});

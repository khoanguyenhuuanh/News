"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutButton = document.getElementById("btn-logout");

//GET DATA FROM DATABASE LOCAL
const KEY1 = "currentUser";
const userLogin = JSON.parse(getFromStorage(KEY1));
console.log(userLogin);

//SHOW SCREEN BEFORE LOGIN AND AFTER LOGIN
if (JSON.parse(getFromStorage(KEY1)) === null) {
  mainContent.classList.add("hide");
} else {
  loginModal.classList.add("hide");
  welcomeMessage.textContent = `Welcome ${userLogin.username}`;
}

//EVENT WHEN CLICK LOGOUT BUTTON
logoutButton.addEventListener("click", function () {
  if (confirm("Are you sure?")) {
    deleteItem(KEY1);
    loginModal.classList.remove("hide");
    mainContent.classList.add("hide");
  }
});

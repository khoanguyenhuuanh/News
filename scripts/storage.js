"use strict";

//SAVE TO LOCAL STORAGE
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//GET FROM LOCAL STORAGE
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//DELETE ITEM LOCAL STORAGE
function deleteItem(key) {
  localStorage.removeItem(key);
}

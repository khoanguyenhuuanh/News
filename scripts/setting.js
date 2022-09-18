"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const saveButton = document.getElementById("btn-submit");

//GET DATA FROM LOCAL
const KEY1 = "currentUser";
const userLogin = JSON.parse(getFromStorage(KEY1)) || [];
const categoryKey = `category-${userLogin.username}`;
const categorySetting = JSON.parse(getFromStorage(categoryKey)) || {
  pageSize: 5,
  category: "General",
};

pageSizeInput.value = categorySetting.pageSize;
categoryInput.value = categorySetting.category;

//CHECK DATA INPUT
function validateSetting(dataInput) {
  //CHECK PAGE SIZE NUMBER
  if (!dataInput.pageSize) {
    alert("Page size must be number value!");
    return false;
  } //CHECK PAGE SIZE AT LEAST 1
  else if (dataInput.pageSize < 1) {
    alert("Page size must at least 1!");
    return false;
  } else {
    return true;
  }
}

//EVENT CLICK SAVE BUTTON
saveButton.addEventListener("click", function () {
  const dataInput = {
    pageSize: pageSizeInput.value,
    category: categoryInput.value,
  };
  //CHECK DATA INPUT
  if (validateSetting(dataInput)) {
    saveToStorage(categoryKey, JSON.stringify(dataInput));
    alert("Save Success!");
  }
});

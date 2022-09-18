"use strict";

const queryInput = document.getElementById("input-query");
const submitButton = document.getElementById("btn-submit");
const containerNews = document.getElementById("search-container");
const numPage = document.getElementById("page-num");
const navPageNum = document.getElementById("nav-page-num");
const prevButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");

//GET DATA FROM LOCAL DATABASE
const KEY1 = "currentUser";
const userLogin = JSON.parse(getFromStorage(KEY1)) || [];
const categoryKey = `category-${userLogin.username}`;
const categorySetting = JSON.parse(getFromStorage(categoryKey)) || {
  pageSize: 5,
  category: "General",
};
let flag = 0;
//CHECK NUMBER PAGE TO DISPLAY PREV OR NEXT BUTTON
numChange();

//CHECK INPUT VALUE
function validateQuery() {
  if (queryInput.value === "") {
    alert("Please input your query!");
    return false;
  } else {
    return true;
  }
}

//EVENT SUBMIT BUTTON SEARCH
submitButton.addEventListener("click", function () {
  flag = 0;
  navPageNum.classList.remove("hide");
  containerNews.innerHTML = "";
  numPage.textContent = 1;
  numChange();
  if (validateQuery()) {
    dataWebAPI(
      `https://newsapi.org/v2/everything?q=${queryInput.value}&apiKey=e3112a61abea40279c2114326e8e438e`
    );
  }
});

//EVENT CLICK PREV BUTTON
prevButton.addEventListener("click", function () {
  flag = 0;
  //CHECK VALUE PAGE NUMBER
  if (Number(numPage.textContent) > 1) {
    numPage.textContent--;
    console.log(numPage.textContent);
  }
  let page = Number(numPage.textContent);
  let pageSize = categorySetting.pageSize;
  containerNews.innerHTML = "";
  //INIT DATA GET FROM API
  for (
    let i = (page - 1) * pageSize;
    page * pageSize > n ? i < n : i < page * pageSize;
    i++
  ) {
    renderNews(data.articles[i]);
  }
  numChange();
});

//EVENT CLICK NEXT BUTTON
nextButton.addEventListener("click", function () {
  let pageSize = categorySetting.pageSize;
  //CHECK VALUE PAGE NUMBER
  if (Number(numPage.textContent) <= Math.floor(n / pageSize)) {
    numPage.textContent++;
    console.log(numPage.textContent);
    if (
      n % pageSize === 0 &&
      Number(numPage.textContent) === Math.floor(n / pageSize)
    ) {
      flag = 1;
    } else if (
      n % pageSize !== 0 &&
      Number(numPage.textContent) > Math.floor(n / pageSize)
    ) {
      flag = 1;
    }
  }
  let page = Number(numPage.textContent);
  containerNews.innerHTML = "";
  //INIT DATA GET FROM API
  for (
    let i = (page - 1) * pageSize;
    page * pageSize > n ? i < n : i < page * pageSize;
    i++
  ) {
    renderNews(data.articles[i]);
  }
  numChange();
});

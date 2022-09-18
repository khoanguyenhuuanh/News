"use strict";

const containerNews = document.getElementById("news-container");
const numPage = document.getElementById("page-num");
const prevButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");

//GET DATA FROM DATABASE LOCAL
const KEY1 = "currentUser";
const userLogin = JSON.parse(getFromStorage(KEY1)) || [];
const categoryKey = `category-${userLogin.username}`;
const categorySetting = JSON.parse(getFromStorage(categoryKey)) || {
  pageSize: 5,
  category: "General",
};

let flag = 0;
//CHECK PAGE TO DISPLAY BUTTON PREV OR NEXT
numChange();

dataWebAPI(
  `https://newsapi.org/v2/top-headlines?country=us&category=${categorySetting.category.toLowerCase()}&apiKey=e3112a61abea40279c2114326e8e438e`
);

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

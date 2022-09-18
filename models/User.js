"use strict";

//DEFINE USER
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

//PARSE DATA TO USER CLASS
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

//DEFINE USER
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

let n = 0;
let data = [];

//GET API WEB
const dataWebAPI = async function (apiLink) {
  try {
    //REQUEST API
    const request = await fetch(apiLink);
    if (!request.ok) throw new Error("Problem with data!");
    console.log(request);
    //GET DATA FROM REQUEST
    data = await request.json();
    console.log(data);
    n = data.articles.length;
    console.log(data.articles.length);
    let page = Number(numPage.textContent);
    let pageSize = categorySetting.pageSize;
    //INIT DATA
    for (
      let i = (page - 1) * pageSize;
      page * pageSize > n ? i < n : i < page * pageSize;
      i++
    ) {
      renderNews(data.articles[i]);
    }
  } catch (error) {
    console.error(error);
  }
};

//INIT DATA NEWS
const renderNews = function (data) {
  const html = `
  <div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="${data.urlToImage}"
            class="card-img"
            alt="${data.title}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              ${data.title}
            </h5>
            <p class="card-text">
              ${data.description}
            </p>
            <a
              href="${data.url}"
              class="btn btn-primary"
              >View</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  containerNews.insertAdjacentHTML("beforeend", html);
};

//CHECK PAGE NUM TO DISPLAY PRE OR NEXT BUTTON
function numChange() {
  if (Number(numPage.textContent) === 1) {
    prevButton.classList.add("hide");
  } else {
    prevButton.classList.remove("hide");
  }
  if (flag === 1) {
    nextButton.classList.add("hide");
  } else {
    nextButton.classList.remove("hide");
  }
}

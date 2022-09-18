"use strict";

const taskInput = document.getElementById("input-task");
const addButton = document.getElementById("btn-add");
const todoListEl = document.getElementById("todo-list");

//GET DATA FROM LOCAL STORAGE
const KEY1 = "currentUser";
const userLogin = JSON.parse(getFromStorage(KEY1)) || [];
console.log(userLogin);
const userKey = `Task-${userLogin.username}`;
const todoArr = JSON.parse(getFromStorage(userKey)) || [];

//INIT DATA TASK TABLE
renderTasksTable(todoArr);
console.log(todoArr);

//CHECK DATA INPUT
function validateTask() {
  if (taskInput.value === "") {
    alert("Please input your task!");
    return false;
  } else {
    return true;
  }
}

//INIT TASKS TABLE
function renderTasksTable(todoArr) {
  todoListEl.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    //INIT LI ELEMENT
    const li = document.createElement("li");
    li.textContent = todoArr[i].task;
    //CHECK ISDONE TO DISPLAY
    if (todoArr[i].isDone) {
      li.classList.add("checked");
    }
    //INIT SPAN ELEMENT
    const span = document.createElement("span");
    span.className = "close";
    span.textContent = "x";
    //ADD SPAN TO LI ELEMENT
    li.appendChild(span);
    //EVENT CLICK LI
    li.addEventListener("click", function () {
      li.classList.toggle("checked");
      if (todoArr.length === 0) {
        return;
      } else if (todoArr[i].isDone) {
        todoArr[i].isDone = false;
        saveToStorage(userKey, JSON.stringify(todoArr));
      } else {
        todoArr[i].isDone = true;
        saveToStorage(userKey, JSON.stringify(todoArr));
      }
    });
    //EVENT CLICK DELETE
    span.addEventListener("click", function () {
      if (confirm(`Are you sure you want to delete ${todoArr[i].task} Task?`)) {
        todoArr.splice(i, 1);
        saveToStorage(userKey, JSON.stringify(todoArr));
        renderTasksTable(todoArr);
      }
    });
    //ADD TO TABLE
    todoListEl.appendChild(li);
  }
}

//EVENT CLICK ADD TASK
addButton.addEventListener("click", function () {
  if (validateTask()) {
    const data = new Task(taskInput.value, userLogin.username, false);
    todoArr.push(data);
    console.log(todoArr);
    saveToStorage(userKey, JSON.stringify(todoArr));
    renderTasksTable(todoArr);
  }
});

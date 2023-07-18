const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodolist = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItmesFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItmesFn();
  });

  if (storageData && storageData.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  seveItemsFn();
};

function keyCodeCheck(event) {
  if (event.key === "Enter" && todoInput.value.trim() != "") {
    createTodo();
  }
}
document.querySelector("#todo-input").addEventListener("keydown", keyCodeCheck);

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
};

const saveItmesFn = function () {
  const saveItmes = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItmes.push(todoObj);
  }

  saveItmes.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-itmes", JSON.stringify(saveItmes));
};

if (savedTodolist) {
  for (let i = 0; i < savedTodolist.length; i++) {
    createTodo(savedTodolist[i]);
  }
}

const weatherSearch = function (position) {
  const openweatherRes = fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longtitude}&appid={APIkey}"
  );
};

const accessToGeo = function (position) {
  const positionObj = {
    latitude: position.coords.latitude,
    longtitude: position.coords.longtitude,
  };
  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {});
};

// askForLocation();

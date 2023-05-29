const todoInput = document.querySelector("#todo-input");

function keyCodeCheck(event) {
  if (event.key === "Enter" && todoInput.value != "") {
    const todoList = document.querySelector("#todo-list");
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");

    newSpan.textContent = todoInput.value;
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = "";
  }
}

document.querySelector("#todo-input").addEventListener("keydown", keyCodeCheck);

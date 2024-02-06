function addTodo() {
  var input = document.getElementById("todoInput");
  var text = input.value.trim();
  if (text !== "") {
    var list = document.getElementById("todoList");
    var newItem = document.createElement("li");
    newItem.textContent = text;
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
      list.removeChild(newItem);
    };
    newItem.appendChild(deleteButton);
    list.appendChild(newItem);
    input.value = "";
  }
}

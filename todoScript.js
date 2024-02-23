// todoScript.js

document.addEventListener("DOMContentLoaded", function() {
  // Load todos from localStorage when the page loads
  loadTodos();
});

function addTodo() {
  var todoInput = document.getElementById("todoInput").value;
  if (todoInput.trim() !== "") {
    var todoList = document.getElementById("todoList");
    var li = document.createElement("li");
    
    // Create text node for todo
    var todoText = document.createTextNode(todoInput);
    li.appendChild(todoText);
    
    // Create delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.onclick = function() {
      todoList.removeChild(li);
      saveTodos();
    };
    li.appendChild(deleteButton);
    
    // Create edit button
    var editButton = document.createElement("button");
    editButton.textContent = "Bearbeiten";
    editButton.onclick = function() {
      document.getElementById("todoInput").value = todoText.textContent;
      todoList.removeChild(li);
      saveTodos();
    };
    li.appendChild(editButton);
    
    todoList.appendChild(li);
    document.getElementById("todoInput").value = "";

    // Speichert todo in localStorage
    saveTodos();
  } else {
    alert("Bitte geben Sie einen To-Do-Text ein.");
  }
}

function saveEditTodo() {
  var todoInput = document.getElementById("todoInput").value;
  if (todoInput.trim() !== "") {
    var todoList = document.getElementById("todoList");
    var selectedTodo = todoList.querySelector("li.selected");
    if (selectedTodo) {
      selectedTodo.firstChild.textContent = todoInput; // Update the text of the todo
      selectedTodo.classList.remove("selected");
      saveTodos(); // Speichert  lokal die änderungen, nach dem Edit
      location.reload(); // Ladet die Seite neu , nach editieren
    } else {
      alert("Es wurde kein To-Do zum Bearbeiten ausgewählt.");
    }
    document.getElementById("todoInput").value = "";
  } else {
    alert("Bitte geben Sie einen To-Do-Text ein.");
  }
}

function saveTodos() {
  var todoList = document.getElementById("todoList");
  var todos = [];
  for (var i = 0; i < todoList.children.length; i++) {
    var todoText = todoList.children[i].firstChild.textContent;
    todos.push(todoText);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  var storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    var todos = JSON.parse(storedTodos);
    var todoList = document.getElementById("todoList");
    todos.forEach(function(todoText) {
      var li = document.createElement("li");
      
      var todoTextNode = document.createTextNode(todoText);
      li.appendChild(todoTextNode);
      
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Löschen";
      deleteButton.onclick = function() {
        todoList.removeChild(li);
        saveTodos();
      };
      li.appendChild(deleteButton);
      
      var editButton = document.createElement("button");
      editButton.textContent = "Bearbeiten";
      editButton.onclick = function() {
        document.getElementById("todoInput").value = todoTextNode.textContent;
        todoList.removeChild(li);
        saveTodos();
      };
      li.appendChild(editButton);
      
      todoList.appendChild(li);
    });
  }
}

// Get the input and list elements
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
//----------------------header-----------------
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});
 
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
/*-------------------------------------------------------------------*/


/*-------------------------Adding data to the page----------------------------------------------*/
let today =new Date();
    
let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

let day = today.toLocaleDateString("en-US", option);
document.getElementById("date").innerHTML = day + " thoughts";
//------------------------------------------------------------------------------------



// Add task to the list
function addTask(task) {
  // Create a new list item
  const li = document.createElement("li");

  // Add the task text to a span element
  const span = document.createElement("span");
  span.innerText = task;

  // Add the edit and delete buttons
  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.className = "edit-btn";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.className = "delete-btn";

  // Append the span and buttons to the list item
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // Append the list item to the list
  todoList.appendChild(li);
}

// Handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const task = todoInput.value;
  if (task) {
    addTask(task);
    todoInput.value = "";
    todoInput.placeholder = "Task added!";
  } else {
    todoInput.placeholder = "Please enter a task";
  }
}

// Handle the edit button click
function handleEditClick(event) {
  const listItem = event.target.parentElement;
  const span = listItem.querySelector("span");
  const editBtn = listItem.querySelector(".edit-btn");
  const deleteBtn = listItem.querySelector(".delete-btn");

  if (editBtn.innerText === "Save") {
    span.contentEditable = false;
    editBtn.innerText = "Edit";
    deleteBtn.style.display = "inline-block";
  } else {
    span.contentEditable = true;
    span.focus();
    editBtn.innerText = "Save";
    deleteBtn.style.display = "none";
  }
}

// Handle the delete button click
function handleDeleteClick(event) {
  const listItem = event.target.parentElement;
  setTimeout(() => {
    todoList.removeChild(listItem);
  }, 100);
}

// Add event listeners
document.querySelector("form").addEventListener("submit", handleFormSubmit);
todoList.addEventListener("click", function(event) {
  if (event.target.classList.contains("edit-btn")) {
    handleEditClick(event);
  } else if (event.target.classList.contains("delete-btn")) {
    handleDeleteClick(event);
  }
});
//_______________________________________________________________________________________________________________________________________________________________________________________

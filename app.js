//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".add-item__input"); //Add a new task.
var addButton = document.querySelector(".add-item__button"); //first button
var incompleteTaskHolder = document.querySelector(".todo"); //ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".todo_done"); //completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "todo-item todo-item_checked";
  //input (checkbox)0
  var checkBox = document.createElement("input");
  checkBox.className = "todo-item__input-check todo-item_checked"; //checkbox
  //label
  var label = document.createElement("label"); //label
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button
  var deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskString;
  label.className = "todo-item__title todo-item_checked";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "todo-item__input todo-item_checked";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "todo-item__save-button";

  deleteButton.className = "todo-item__delete-button";
  deleteButtonImg.className = "todo-item__delete-img";
  deleteButtonImg.setAttribute("alt", "delete");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

//Edit an existing task.

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".todo-item__save-button");
  var containsClass = editInput.classList.contains("todo-item_checked");

  if (containsClass || label.classList.contains("todo-item_completed")) {
    //switch to .editmode
    //label becomes the inputs value.
    editBtn.innerText = "Save";
    editInput.value = label.innerText;
    editInput.classList.remove("todo-item_checked");
    label.classList.remove("todo-item_checked");

    if (label.classList.contains("todo-item_completed")) {
      editInput.classList.remove("todo-item_completed");
      label.classList.remove("todo-item_completed");
    }
  } else {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    editInput.classList.add("todo-item_checked");
    label.classList.add("todo-item_checked");

    if (listItem.parentNode.classList.contains("todo_done")) {
      editInput.classList.add("todo-item_completed");
      label.classList.add("todo-item_completed");
    }
  }

  //toggle .editmode on the parent.
};

//Delete task.
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  var title = listItem.querySelector(".todo-item__title");
  var input = listItem.querySelector(".todo-item__input");
  var btn = listItem.querySelector(".todo-item__save-button");

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

  listItem.classList.toggle("todo-item_completed");
  title.classList.toggle("todo-item_completed");
  title.classList.remove("todo-item_checked");
  input.classList.toggle("todo-item_completed");
  input.classList.remove("todo-item_checked");
  btn.innerText = "Edit";
  // listItem.classList.contains('plan-list-item_completed') || listItem.classList.contains('plan-list-item_checked')
  //   ? "Edit"
  //   : "Save";
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  var title = listItem.querySelector(".todo-item__title");
  var input = listItem.querySelector(".todo-item__input");
  var btn = listItem.querySelector(".todo-item__save-button");

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  if (
    title.classList.contains("todo-item_completed") &&
    input.classList.contains("todo-item_completed")
  ) {
    input.classList.remove("todo-item_completed");
    title.classList.remove("todo-item_completed");

    input.classList.add("todo-item_checked");
    title.classList.add("todo-item_checked");

    return;
  }

  if (
    !listItem.classList.contains("todo-item_completed") &&
    !listItem.classList.contains("todo-item_checked")
  ) {
    return;
  }

  if (
    !listItem.classList.contains("todo-item_completed") ||
    !listItem.classList.contains("todo-item_checked")
  ) {
    btn.innerText = "Edit";
  } else {
    btn.innerText = "Save";
  }
  // btn.innerText = "Save";
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".todo-item__save-button");
  var deleteButton = taskListItem.querySelector(".todo-item__delete-button");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

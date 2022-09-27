//COOKIE-SUPPORT METHODS BLOCK
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
//END OF COOKIE-SUPPORT METHODS BLOCK

let arrayOfTasks = [];

function addTaskToArray() {
  if (!addInput.value) {
    return false;
  }

  let taskValue = addInput.value;

  let task = {
    id: Date.now(),
    title: taskValue,
  };

  arrayOfTasks.push(task);

  addTaskToPageFrom(arrayOfTasks);

  parseToJSON(arrayOfTasks);
}

function addTaskToPageFrom(list) {
  let tasks = document.querySelector(".tasks");

  tasks.innerHTML = "";

  list.forEach((task) => {
    let tasksDiv = document.createElement("div");
    tasksDiv.className = "tasksDiv";

    let taskTitle = document.createElement("h3");
    taskTitle.className = "taskTitle";
    taskTitle.innerHTML = task.title;

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    let editBtn = document.createElement("img");
    editBtn.className = "editBtn";
    editBtn.src = "./icons/edit.png";
    editBtn.onclick = () => {
      // addInput.value = taskTitle.innerHTML;
      // addBtn.innerHTML = "Edit";
      taskTitle.innerHTML = "test";
    };

    let deleteBtn = document.createElement("img");
    deleteBtn.className = "deleteBtn";
    deleteBtn.src = "./icons/remove.png";
    deleteBtn.onclick = () => {
      tasksDiv.style.display = "none";
      arrayOfTasks = JSON.parse(getCookie("list"));
      arrayOfTasks.splice(tasksDiv.id, 1);
      parseToJSON(arrayOfTasks);
    };

    clearBtn.onclick = () => {
      arrayOfTasks.splice(0, arrayOfTasks.length);
      let list = document.querySelectorAll(".tasksDiv");
      for (let elem of list) {
        elem.style.display = "none";
      }
      eraseCookie("list");
    };

    tasks.appendChild(tasksDiv);
    tasksDiv.appendChild(taskTitle);
    tasksDiv.appendChild(buttons);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    addInput.value = "";
  });
}

function parseToJSON(arrayOfTasks) {
  let res = JSON.stringify(arrayOfTasks);

  setCookie("list", res, 1);
}

if (getCookie("list")) {
  arrayOfTasks = JSON.parse(getCookie("list"));
}

if (getCookie("list")) {
  (() => {
    let data = getCookie("list");
    data = JSON.parse(data);

    addTaskToPageFrom(data);
  })();
}

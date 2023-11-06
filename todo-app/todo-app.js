const addTask = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector("#modal");
const editButton = document.querySelector("#editButton");
const openModalBtn = document.querySelector("#openModalBtn");
const textAreaField = document.querySelector("#textAreaField");

let activeTaskId;

// state
const taskDetails = {
  taskList: [], // {id, label}
  setTaskList: function (filteredTaskList) {
    this.taskList = filteredTaskList;
    UpdateUI();
  },

  addToTaskList: function (input) {
    this.taskList.push(input);
    UpdateUI();
  },
};

// MODAL CODE
closeButton.addEventListener("click", function () {
  closeModal();
});

const closeModal = () => {
  if (modal.classList.contains("close")) {
  } else {
    modal.classList.add("close");
  }
};
const openModal = () => {
  modal.classList.toggle("toggle-modal");
};

const toggleModal = (task) => {
  modal.classList.toggle("close");
  textAreaField.value = task.label;
  activeTaskId = task.id;
};

editButton.addEventListener("click", () => {
  const editedTask = taskDetails.taskList.find((el) => activeTaskId === el.id);

  editedTask.label = textAreaField.value;
  closeModal();

  UpdateUI();
});

// HELPERS
const createDate = () => {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const truncateWord = (input, numberOfCharacter = 30) => {
  if (input.length > numberOfCharacter) {
    return `${input.slice(0, numberOfCharacter)} ...`;
  }
  return input;
};

const deleteTask = (id) => {
  const filteredList = taskDetails.taskList.filter((task) => {
    return task.id !== id;
  });
  taskDetails.setTaskList(filteredList);
};

const UpdateUI = () => {
  document.querySelector("#taskList").innerHTML = "";
  taskDetails.taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("items")

    li.innerHTML = `<div class="flex" id="flex" style="color:white;opacity:${
      task.checked ? 0.5 : 1
    }">
    
    <div id="textEl">
   
    <div>
    ${
      task.checked
        ? `<input id='checkBox' onchange='check(${task.id})' type="checkbox" checked>`
        : `<input id='checkBox' onchange='check(${task.id})' type="checkbox" >`
    }

    <span class="text">${truncateWord(task.label)} </span>
    
    </div>

    <div> <span class="date">${createDate()}</span></div>
    </div>
    

    

    <div class="sub-flex">
  <i class="fa-solid fa-pen-to-square edit"  id="openModalBtn" onclick='toggleModal(${JSON.stringify(
    task
  )})'></i>

  <i class="fa-solid fa-trash-can delete" onclick='deleteTask(
    ${task.id}
   ) '></i> 

   </div>
  </div>`;
    document.querySelector("#taskList").appendChild(li);
  });
};

function check(id) {
  const editedTask = taskDetails.taskList.find((el) => id === el.id);
  editedTask.checked = !editedTask.checked;
  UpdateUI();
}

const upDateTaskList = (input) => {
  taskDetails.addToTaskList(input);
};

addTask.addEventListener("click", () => {
  upDateTaskList({ id: Date.now(), label: taskInput.value, checked: false });
  taskInput.value = "";
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key.toLocaleLowerCase() == "enter") {
    upDateTaskList({ id: Date.now(), label: taskInput.value });
    taskInput.value = "";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  UpdateUI();
});


// // sidebar
const box = document.getElementById("box");

const displaySearch = document.getElementById("displaySearch");
const search = document.getElementById("search");
const headContent = document.getElementById("headContent");

const todoList =[]

const boxDiv= document.createElement("div");
boxDiv.classList.add("head-content");
boxDiv.innerHTML = `
          <div>
            <i class="fa-solid fa-bars" id="menu"></i>
          </div>

          <div class="sub-head-content">
            <div>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <div>
              <i class="fa-regular fa-bell"></i>
            </div>
          </div>
`

box.appendChild(boxDiv)



// // side menu mobile version


const menuEL = document.querySelector("#menu");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeX");


menuEL.addEventListener('click',(e)=>{
  sideMenu.style.display='block'
})

closeBtn.addEventListener('click',(e)=>{
  sideMenu.style.display='none'
})
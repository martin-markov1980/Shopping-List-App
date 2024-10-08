import { buildBodyTable, tableBody } from "./functions/functions.js";

let addTaskBtn = document.getElementById('add-task');
let addTaskBtnModal = document.getElementById('add-task-btn-modal');
let addItemModal = document.getElementById('add-item-modal');
let taskName = document.getElementById('task-name');
let quantity = document.getElementById('task-quantity');
let deleteAllTasksBtn = document.getElementById('delete-all-yes-modal');
let deleteSingleYesModal = document.getElementById('delete-single-yes-modal');
let search = document.getElementById('search');
let searchBtn = document.getElementById('search-btn');
// On the initial browser load or browser refresh, get the tasks from the localStorage, build and display them.
tableBody.innerHTML = '';
buildBodyTable();

// Disabled Add Task Button to prevent sending empty task name and quantity values.
addTaskBtn.addEventListener('click', () => {
    let att = document.createAttribute('disabled');
    addTaskBtnModal.setAttributeNode(att);
})

// Checking if task name and quantity have values, and enabling the Add Task Button if they DO.
addItemModal.addEventListener('input', () => {
    if (taskName.value.trim() !== '' && quantity.value.trim() !== '') {
        let att = addTaskBtnModal.getAttributeNode('disabled');
        if (att) {
            addTaskBtnModal.removeAttributeNode(att);
        }
    } else {
        let att = document.createAttribute('disabled');
        addTaskBtnModal.setAttributeNode(att);
    }
})

// Add task to local storage. 
addTaskBtnModal.addEventListener('click', addTask);

function addTask() {

    localStorage.setItem(`${taskName.value}`, `${quantity.value}`);
    taskName.value = '';
    quantity.value = '';
    tableBody.innerHTML = '';

    buildBodyTable();

}

// Delete single tasks.
deleteSingleYesModal.addEventListener('click', triggerSingleItemDeletion);
tableBody.addEventListener('click', deleteSingleItem);

let targetBTN;
function deleteSingleItem(e) {
    targetBTN = e.target;
}

function triggerSingleItemDeletion() {

    if (targetBTN.innerHTML === 'X') {

        let keyToDelete = targetBTN.parentNode.previousSibling.previousSibling.innerHTML
        localStorage.removeItem(keyToDelete);
        tableBody.innerHTML = '';

        buildBodyTable();
    }

}

// Delete all tasks.
deleteAllTasksBtn.addEventListener('click', deleteAllTasks);

function deleteAllTasks() {
    localStorage.clear();
    tableBody.innerHTML = '';
}

// Search Item functionality for both on typing and using the search button
search.addEventListener('input', searchItem);

function searchItem(e) {
    let itemNames = document.querySelectorAll('tbody tr');
    let searchedString = search.value.toLowerCase();
    for (let name of itemNames) {
        if (name.firstElementChild.innerText.toLowerCase().indexOf(searchedString) === -1) {
            name.style.display = 'none';
        } else {
            name.style.display = 'table-row';
        }
    }
}

searchBtn.addEventListener('click', searchItemOnClick);

function searchItemOnClick(e) {
    e.preventDefault();
    let itemNames = document.querySelectorAll('tbody tr');
    let searchedString = search.value;
    for (let name of itemNames) {
        if (name.firstElementChild.innerText.indexOf(searchedString) === -1) {
            name.style.display = 'none';
        } else {
            name.style.display = 'table-row';
        }
    }
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
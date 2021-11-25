
let addTaskBtn = document.getElementById('add-task');
let addTaskBtnModal = document.getElementById('add-task-btn-modal');
let addItemModal = document.getElementById('add-item-modal');
let tableBody = document.querySelector('tbody')
let taskName = document.getElementById('task-name');
let taskNameValue;
let quantity = document.getElementById('task-quantity');
let quantityValue;
let itemNameChecker = document.getElementById('item-name-checker');
let taskQuantityChecker = document.getElementById('task-quantity-checker');
let deleteAllTasksBtn = document.getElementById('delete-all-yes-modal');

// Add Task Event
addTaskBtnModal.addEventListener('click', addTask);

// Delete All Tasks Event
deleteAllTasksBtn.addEventListener('click', deleteAllTasks);

// Disabled Add Task Button to prevent sending empty task name and quantity values
addTaskBtn.addEventListener('click', () => {
    let att = document.createAttribute('disabled');
    addTaskBtnModal.setAttributeNode(att);
})

// Checking if task name and quantity have values and enabling the Add Task Button if they DO
addItemModal.addEventListener('keyup', () => {
    if (taskName.value.trim() !== ''  && quantity.value.trim() !== '') {
        let att = addTaskBtnModal.getAttributeNode('disabled');
        if (att) {
            addTaskBtnModal.removeAttributeNode(att);
        }
    }   else {
        let att = document.createAttribute('disabled');
        addTaskBtnModal.setAttributeNode(att);
    }
})

// Get the tasks from the localStorage. Build and display them
tableBody.innerHTML = '';
for (let index = 0; index < localStorage.length; index++) {
        let itemName = localStorage.key(index);
        let itemQuantity = localStorage.getItem(itemName);

        let tr = document.createElement('tr');
        let tdItem = document.createElement('td');
        let btn = document.createElement('button');
        btn.className ='btn btn-danger btn-lg';
        btn.innerHTML = 'X'


        btn.setAttribute('id', 'delete-single-item')
        btn.setAttribute('data-bs-toggle', 'modal');
        btn.setAttribute('data-bs-target', '#delete-single-item-modal')


        tdItem.innerHTML = itemName;
        let tdQuantity = document.createElement('td');
        tdQuantity.innerHTML = itemQuantity;
        let tdButton = document.createElement('td');
        tdButton.appendChild(btn);

        tr.appendChild(tdItem);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdButton);

        tableBody.appendChild(tr);
    
}

// Add Task To Local Storage 
function addTask() {
    localStorage.setItem(`${taskName.value}`, `${quantity.value}`);
    taskName.value = '';
    quantity.value = '';
    tableBody.innerHTML = '';

    for (let index = 0; index < localStorage.length; index++) {
        let itemName = localStorage.key(index);
        let itemQuantity = localStorage.getItem(itemName);
    
        let tr = document.createElement('tr');
        let tdItem = document.createElement('td');
        let btn = document.createElement('button');
        btn.className ='btn btn-danger btn-lg';
        btn.innerHTML = 'X'
        tdItem.innerHTML = itemName;
        let tdQuantity = document.createElement('td');
        tdQuantity.innerHTML = itemQuantity;
        let tdButton = document.createElement('td');
        tdButton.appendChild(btn);

        tr.appendChild(tdItem);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdButton);

        tableBody.appendChild(tr);
        
    }
}

// Testing how to remove single item from Local Storage
tableBody.addEventListener('click', (e) => {
    let targetBTN = e.target;
    if (targetBTN.innerHTML === 'X') {
        // targetBTN.setAttribute('id', 'delete-single-item')
        // targetBTN.setAttribute('data-bs-toggle', 'modal');
        // targetBTN.setAttribute('data-bs-target', '#delete-single-item-modal')
        // let deleteSingleItemBtn = document.getElementById('delete-single-item')

        console.log(targetBTN);
        // return
        let keyToDelete = targetBTN.parentNode.previousSibling.previousSibling.innerHTML
        localStorage.removeItem(keyToDelete);
        tableBody.innerHTML = '';
        for (let index = 0; index < localStorage.length; index++) {
                let itemName = localStorage.key(index);
                let itemQuantity = localStorage.getItem(itemName);

                let tr = document.createElement('tr');
                let tdItem = document.createElement('td');
                let btn = document.createElement('button');
                btn.className ='btn btn-danger btn-lg';
                btn.innerHTML = 'X'
                tdItem.innerHTML = itemName;
                let tdQuantity = document.createElement('td');
                tdQuantity.innerHTML = itemQuantity;
                let tdButton = document.createElement('td');
                tdButton.appendChild(btn);

                tr.appendChild(tdItem);
                tr.appendChild(tdQuantity);
                tr.appendChild(tdButton);

                tableBody.appendChild(tr);
            
        }
    }
})

// Delete All Tasks
function deleteAllTasks() {
    localStorage.clear();
    tableBody.innerHTML = '';
}

fetch('http swapi.dev/api/planets/1/')
.then(res => res.json)
.then

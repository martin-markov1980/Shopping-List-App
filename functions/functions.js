let tableBody = document.querySelector('tbody');

function buildBodyTable() {
  for (let index = 0; index < localStorage.length; index++) {

    let itemName = localStorage.key(index);
    let itemQuantity = localStorage.getItem(itemName);

    let tr = document.createElement('tr');
    let tdItem = document.createElement('td');
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-lg';
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
}

export { buildBodyTable, tableBody };

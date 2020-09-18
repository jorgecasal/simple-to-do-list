const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = '';

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems)

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = Math.floor(new Date().getTime() * Math.random()).toString();
    if(value && !editFlag){
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p><div class="btn-container"><button type="button" class="edit-btn"><i class="fa fa-edit"></i></button><button type="button" class="delete-btn"><i class="fa fa-trash"></i></button></div>`;
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)
        list.appendChild(element);
        displayAlert('item added', 'success');
        container.classList.add("show-container");
        addToLocalStorage(id, value);
        setBackToDefault();
    }else if(value && editFlag){

    }else{
        displayAlert('Please enter value', 'danger')
    }
};

function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(()=>{
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1500)
};

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement
    list.removeChild(element);
}

function editItem(){
    console.log('editItem');
}

function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

function clearItems(){
    const items = document.querySelectorAll('grocery-item');
    if(items.length > 0){
        items.forEach((i)=>{
            list.removeChild(i);
        });
    }
    container.classList.remove('show-container');
    displayAlert('the list is empty', 'success');
    setBackToDefault();
    // localStorage.removeItem('list');
};

function addToLocalStorage(id, value){
    console.log('addToLocalStorage')
};

// ****** SETUP ITEMS **********

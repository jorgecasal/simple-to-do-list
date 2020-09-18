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
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = Math.floor(new Date().getTime() * Math.random()).toString();
    if(value && !editFlag){
        createListItem(id, value);
        displayAlert('item added', 'success');
        container.classList.add("show-container");
        addToLocalStorage(id, value);
        setBackToDefault();
    }else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('the item has been changed', 'success');
        editFromLocalStorage(editID, value);
        setBackToDefault();
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
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'success');
    setBackToDefault();
    removeFromLocalStorage(id)
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((i)=>{
            list.removeChild(i);
        });
    }
    container.classList.remove('show-container');
    displayAlert('the list is empty', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
};

function addToLocalStorage(id, value){
    const grocery = {id,value};
    let items = getFromLocalStorage();
    console.log(items)
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
};

function removeFromLocalStorage(id){
    let items = getFromLocalStorage();
    items = items.filter((i)=>{
        if(i.id !== id){
            return i;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
};

function editFromLocalStorage(id, value){
    let items = getFromLocalStorage();
    items = items.map((i)=>{
        if(i.id === id){
            i.value = value;
        }
        return i;
    })
    localStorage.setItem('list', JSON.stringify(items));
};

function getFromLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
};

function setupItems (){
    let items = getFromLocalStorage();
    if(items.length > 0){
        items.forEach((i)=>{
            createListItem(i.id, i.value)
        })
        container.classList.add('show-container')
    }
};

function createListItem(id, value){
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
}
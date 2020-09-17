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

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = Math.floor(new Date().getTime() * Math.random()).toString();
    if(value && !editFlag){

    }else if(value && editFlag){
        alert.textContent = 'empty value';
        alert.classList.add('alert-danger');
    }else
};

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********

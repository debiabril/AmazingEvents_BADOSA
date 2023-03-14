import data from "./amazing.js";
import { displayEvents, createCard, renderCards, showCategoriesInCheckboxes } from './functions.js';

const divCardsIndex = document.getElementById('cardsIndex');
const ruta = "./pages/";
let cards = displayEvents(data.events, divCardsIndex, createCard, ruta);
let checkboxesCategories = showCategoriesInCheckboxes(data.events);

const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

console.log([searchInput]);

//Funcion para el Search
function filterByName(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    return filtersArray;
}
//Filtrado por categorias
function filterByCategories(array){
    const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

//Función para que funcionen juntos
function ultraFilter(pointer){
    pointer.preventDefault();
    divCardsIndex.innerHTML=``
    let filterArrayName = filterByName(data.events, searchInput.value)
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, divCardsIndex, createCard, ruta);
}

searchInput.addEventListener('input', ultraFilter);
searchButton.addEventListener('submit', (pointer)=>{
    ultraFilter(pointer)
});
searchButton.addEventListener('onclick', (pointer)=>{
    ultraFilter(pointer)
});
checkContainer.addEventListener('change', ultraFilter);
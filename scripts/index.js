import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes } from './functions.js';


const divCardsIndex = document.getElementById('cardsIndex');
const ruta = "./pages/";
let cards = displayEvents(data.events, divCardsIndex, createCard, ruta);
let checkboxesCategories = showCategoriesInCheckboxes(data.events);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

/* console.log([searchInput]);
console.log([searchButton]); */

//Funcion para el Search
function filterByName(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    return filtersArray;
}
//Filtrado por categorias
function filterByCategories(array){
    const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

//Función para que funcionen juntos
function ultraFilter(event){
    event.preventDefault();
    divCardsIndex.innerHTML=``;
    let filterArrayName = filterByName(data.events, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, divCardsIndex, createCard, ruta);
}
searchInput.addEventListener('input', ultraFilter);
searchForm.addEventListener('submit', ultraFilter);
searchButton.addEventListener('click', ultraFilter);
checkContainer.addEventListener('change', ultraFilter);
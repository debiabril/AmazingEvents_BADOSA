import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes } from './functions.js';

const divCardsPastEvents = document.getElementById('cardsPastEvents');
const pastEvents = data.events.filter((event) => {
    return event.date < data.currentDate;});
let cards = displayEvents(pastEvents, divCardsPastEvents, createCard);

let checkboxesCategories = showCategoriesInCheckboxes(pastEvents);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

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
    divCardsPastEvents.innerHTML=``;
    let filterArrayName = filterByName(pastEvents, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, divCardsPastEvents, createCard);
}

searchInput.addEventListener('input', ultraFilter);
searchForm.addEventListener('submit', ultraFilter);
searchButton.addEventListener('click', ultraFilter);
checkContainer.addEventListener('change', ultraFilter);
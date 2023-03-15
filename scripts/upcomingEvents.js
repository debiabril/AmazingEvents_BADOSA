import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes } from './functions.js';

const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
const upcomingEvents = data.events.filter((event) => {
    return event.date > data.currentDate;});
let cards = displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);

let checkboxesCategories = showCategoriesInCheckboxes(upcomingEvents);

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
    divCardsUpcomingEvents.innerHTML=``;
    let filterArrayName = filterByName(upcomingEvents, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, divCardsUpcomingEvents, createCard);
}

searchInput.addEventListener('input', ultraFilter);
searchForm.addEventListener('submit', ultraFilter);
searchButton.addEventListener('click', ultraFilter);
checkContainer.addEventListener('change', ultraFilter);
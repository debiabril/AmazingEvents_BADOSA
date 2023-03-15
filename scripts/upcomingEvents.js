import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes, filterByName, filterByCategories} from './functions.js';

const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
const upcomingEvents = data.events.filter((event) => {
    return event.date > data.currentDate;});
let cards = displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);

let checkboxesCategories = showCategoriesInCheckboxes(upcomingEvents);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

//Función para que los filtros funcionen juntos
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
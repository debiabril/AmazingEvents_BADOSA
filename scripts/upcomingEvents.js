import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';

const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
const upcomingEvents = data.events.filter((event) => {
    return event.date > data.currentDate;});
let cards = displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);

let checkboxesCategories = showCategoriesInCheckboxes(upcomingEvents);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

searchInput.addEventListener('input', ()=>{
    ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
});
searchForm.addEventListener('submit', ()=>{
    ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
});
searchButton.addEventListener('click', ()=>{
    ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
});
checkContainer.addEventListener('change', ()=>{
    ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
});
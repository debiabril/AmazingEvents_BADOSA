import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';

const divCardsPastEvents = document.getElementById('cardsPastEvents');
const pastEvents = data.events.filter((event) => {
    return event.date < data.currentDate;});
let cards = displayEvents(pastEvents, divCardsPastEvents, createCard);

let checkboxesCategories = showCategoriesInCheckboxes(pastEvents);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

searchInput.addEventListener('input', ()=>{
    ultraFilter(divCardsPastEvents, pastEvents, searchInput.value)
});
searchForm.addEventListener('submit', ()=>{
    ultraFilter(divCardsPastEvents, pastEvents, searchInput.value)
});
searchButton.addEventListener('click', ()=>{
    ultraFilter(divCardsPastEvents, pastEvents, searchInput.value)
});
checkContainer.addEventListener('change', ()=>{
    ultraFilter(divCardsPastEvents, pastEvents, searchInput.value)
});
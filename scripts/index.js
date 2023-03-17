/* import data from "./amazing.js"; */
import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter, loadData, data} from './functions.js';

/* const {currentDate, events} = await loadData(); */
console.log(data);
/* console.log(events); */
/* const divCardsIndex = document.getElementById('cardsIndex');
const ruta = "./pages/";
let cards = displayEvents(data.events, divCardsIndex, createCard, ruta);
let checkboxesCategories = showCategoriesInCheckboxes(data.events);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

searchInput.addEventListener('input', () => {
    ultraFilter(divCardsIndex, data.events, searchInput.value, ruta)
});
searchForm.addEventListener('submit', () => {
    ultraFilter(divCardsIndex, data.events, searchInput.value, ruta)
});
searchButton.addEventListener('click', () => {
    ultraFilter(divCardsIndex, data.events, searchInput.value, ruta)
});
checkContainer.addEventListener('change', () => {
    ultraFilter(divCardsIndex, data.events, searchInput.value, ruta)
}); */
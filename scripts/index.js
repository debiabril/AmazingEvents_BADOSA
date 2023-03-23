import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
let divCardsIndex = document.getElementById('cardsIndex');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
let ruta = "./pages/";

async function startIndex(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const events = data.events; // Guardar los eventos en una nueva variable
            displayEvents(events, divCardsIndex, createCard, ruta);
            showCategoriesInCheckboxes(events, checkContainer);
            searchInput.addEventListener('input', () => {
                ultraFilter(divCardsIndex, events, searchInput.value, ruta)
            });
            searchForm.addEventListener('submit', () => {
                ultraFilter(divCardsIndex, events, searchInput.value, ruta)
            });
            searchButton.addEventListener('click', () => {
                ultraFilter(divCardsIndex, events, searchInput.value, ruta)
            });
            checkContainer.addEventListener('change', () => {
                ultraFilter(divCardsIndex, events, searchInput.value, ruta)
            });
        }).catch(error => alert("Couldn't load data. Error: ", error));
}
startIndex();



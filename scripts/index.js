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
            if(!data) { // Verficar si hay algún error cargando
            alert("Couldn't load data");
            return;
            }
            const events = data.events; // Guardar los eventos en una nueva variable
            let cards = displayEvents(events, divCardsIndex, createCard, ruta);
            let checkboxesCategories = showCategoriesInCheckboxes(events, checkContainer);
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
        }).catch(error => alert("Error loading data: ", error));
}
startIndex();



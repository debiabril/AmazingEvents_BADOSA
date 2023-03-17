import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter, getData} from './functions.js';

const startIndex = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const events = data.events; // Guardar los eventos en una nueva variable

    const divCardsIndex = document.getElementById('cardsIndex');
    const ruta = "./pages/";
    let cards = displayEvents(events, divCardsIndex, createCard, ruta);
    let checkboxesCategories = showCategoriesInCheckboxes(events);

    const searchForm = document.querySelector('.formSearch');
    const searchInput = document.querySelector('.formSearch > input');
    const searchButton = document.querySelector('.formSearch > button');
    const checkContainer = document.getElementById('formCategories');

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
}

startIndex();



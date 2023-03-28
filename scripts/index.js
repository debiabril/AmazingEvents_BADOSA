import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
//Coloco en variables los containers que voy a necesitar
let divCardsIndex = document.getElementById('cardsIndex');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
let ruta = "./pages/";
//Traigo la data y ejecuto las funciones
async function startIndex(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            // Guardar los eventos en una nueva variable
            const events = data.events; 
            //Crear y mostrar las Cards
            displayEvents(events, divCardsIndex, createCard, ruta);
            //Mostrar las categorías en checkboxes
            showCategoriesInCheckboxes(events, checkContainer);
            //Escuchar los eventos del DOM y filtrar la data
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
        })
        //Muestro el error si no puedo cargar la data
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startIndex();



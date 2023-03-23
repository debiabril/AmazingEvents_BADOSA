import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
//Coloco en variables los containers que voy a necesitar
let divCardsPastEvents = document.getElementById('cardsPastEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
//Traigo la data y ejecuto las funciones
async function startPast(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            // Guardar la fecha en una nueva variable
            const currentDate = data.currentDate; 
            // Guardar los eventos en una nueva variable
            const events = data.events; 
            //Filtro los eventos pasados
            let pastEvents = events.filter((event) => {
                return event.date < currentDate;});
            //Crear y mostrar las Cards
            displayEvents(pastEvents, divCardsPastEvents, createCard);
            //Mostrar las categorías en checkboxes
            showCategoriesInCheckboxes(pastEvents, checkContainer);
            //Escuchar los eventos del DOM y filtrar la data
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
        })
        //Muestro el error si no puedo cargar la data
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startPast();
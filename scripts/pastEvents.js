import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
let divCardsPastEvents = document.getElementById('cardsPastEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
async function startPast(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            if(!data) { // Verficar si hay algún error cargando
            alert("Couldn't load data");
            return;
            }
            const currentDate = data.currentDate; // Guardar la fecha en una nueva variable
            const events = data.events; // Guardar los eventos en una nueva variable
            let pastEvents = events.filter((event) => {
                return event.date < currentDate;});
            let cards = displayEvents(pastEvents, divCardsPastEvents, createCard);
            let checkboxesCategories = showCategoriesInCheckboxes(pastEvents, checkContainer);
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
        }).catch(error => alert("Error loading data: ", error));
}
startPast();
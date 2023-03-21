import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter,getData} from './functions.js';

const startPast = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const currentDate = data.currentDate; // Guardar la fecha en una nueva variable
    const events = data.events; // Guardar los eventos en una nueva variable
    
    const divCardsPastEvents = document.getElementById('cardsPastEvents');
    const searchForm = document.querySelector('.formSearch');
    const searchInput = document.querySelector('.formSearch > input');
    const searchButton = document.querySelector('.formSearch > button');
    const checkContainer = document.getElementById('formCategories');
    const pastEvents = data.events.filter((event) => {
        return event.date < data.currentDate;});
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
}
startPast();
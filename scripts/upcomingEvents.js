import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
let divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
async function startUpcoming(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const currentDate = data.currentDate; // Guardar la fecha en una nueva variable
            const events = data.events; // Guardar los eventos en una nueva variable
            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;});
            displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);
            showCategoriesInCheckboxes(upcomingEvents, checkContainer);
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
        }).catch(error => alert("Couldn't load data. Error: ", error));
}
startUpcoming()


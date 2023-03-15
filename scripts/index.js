import data from "./amazing.js";
import { displayEvents, createCard, showCategoriesInCheckboxes, filterByName, filterByCategories} from './functions.js';


const divCardsIndex = document.getElementById('cardsIndex');
const ruta = "./pages/";
let cards = displayEvents(data.events, divCardsIndex, createCard, ruta);
let checkboxesCategories = showCategoriesInCheckboxes(data.events);

const searchForm = document.querySelector('.formSearch');
const searchInput = document.querySelector('.formSearch > input');
const searchButton = document.querySelector('.formSearch > button');
const checkContainer = document.getElementById('formCategories');

//Función para que los filtros funcionen juntos 
function ultraFilter(event){
    event.preventDefault();
    divCardsIndex.innerHTML=``;
    let filterArrayName = filterByName(data.events, searchInput.value);
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, divCardsIndex, createCard, ruta);
}
searchInput.addEventListener('input', ultraFilter);
searchForm.addEventListener('submit', ultraFilter);
searchButton.addEventListener('click', ultraFilter);
checkContainer.addEventListener('change', ultraFilter);
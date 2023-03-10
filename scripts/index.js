import data from "./amazing.js";
import { displayEvents, createCard, renderCards, showCategoriesInCheckboxes } from './functions.js';

const divCardsIndex = document.getElementById('cardsIndex');
const ruta = "./pages/";
let cards = displayEvents(data.events, divCardsIndex, createCard, ruta);

let checkboxesCategories = showCategoriesInCheckboxes(data.events);
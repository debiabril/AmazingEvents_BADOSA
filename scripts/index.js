import data from "./amazing.js";
import { displayEvents, createCard, renderCards, showCategories } from './functions.js';

const divCardsIndex = document.getElementById('cardsIndex');
let cards = displayEvents(data.events, divCardsIndex, createCard);

let checkboxesCategories = showCategories(data.events);
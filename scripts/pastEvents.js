import data from "./amazing.js";
import { displayEvents, createCard, renderCards, showCategories } from './functions.js';

const divCardsPastEvents = document.getElementById('cardsPastEvents');
const pastEvents = data.events.filter((event) => {
    return event.date < data.currentDate;});
let cards = displayEvents(pastEvents, divCardsPastEvents, createCard);

let checkboxesCategories = showCategories(pastEvents);
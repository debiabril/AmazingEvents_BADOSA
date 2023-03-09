import data from "./amazing.js";
import { displayEvents, createCard, renderCards, showCategories } from './functions.js';

const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
const upcomingEvents = data.events.filter((event) => {
    return event.date > data.currentDate;});
let cards = displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);

let checkboxesCategories = showCategories(upcomingEvents);
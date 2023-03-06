import data from "./amazing.js";
const divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
let cardsUpcomingEvents = '';
function upcomingEvents(events, date){
    for (let event of events) {
        if (event.date > date) {
            cardsUpcomingEvents += `<div class="card mx-2 my-2">
                <img src="${event.image}" class="card-img-top" alt="${event.category}">
                <div class="card-body text-center">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between">
                        <p class="pt-2">${event.price}</p>
                        <a href="./pages/details.html" class="btn btn-nav align-self-center go">Let's Go</a>
                    </div>
                </div>
            </div>`;
        }
        
    }
    return cardsUpcomingEvents;
}

divCardsUpcomingEvents.innerHTML= upcomingEvents(data.events, data.currentDate)
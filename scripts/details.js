import { createDetailsCard} from "./functions.js";
let detailsContainer = document.getElementById('cardDetails');
async function startDetails(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            const events = data.events; // Guardar los eventos en una nueva variable
            const queryString = location.search;
            const param = new URLSearchParams(queryString);
            let eventId = param.get('id');
            let event = events.find(event => event._id == eventId);
            if (!event) {
                detailsContainer.innerHTML= `<h1 class="d-flex justify-content-center">We didn't find results.</h1>`
            }
            createDetailsCard(event,detailsContainer);
        }).catch(error => alert("Couldn't load data. Error: ", error));
}
startDetails();
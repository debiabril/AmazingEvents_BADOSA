import { createDetailsCard, getData} from "./functions.js";

const startDetails = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const events = data.events; // Guardar los eventos en una nueva variable
    
    const queryString = location.search;
    const param = new URLSearchParams(queryString);
    let eventId = param.get('id');
    let event = events.find(event => event._id == eventId);
    let detailsContainer = document.getElementById('cardDetails');
    if (!event) {
        detailsContainer.innerHTML= `<h1 class="d-flex justify-content-center">We didn't find results.</h1>`
    }
    createDetailsCard(event,detailsContainer);
}
startDetails();
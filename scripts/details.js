import { createDetailsCard, getData} from "./functions.js";

const startDetails = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargo
        console.error("No se pudo cargar los datos");
        return;
    }
    const events = data.events; // Guardar los eventos en una nueva variable
    
    const queryString = location.search;
    const param = new URLSearchParams(queryString);
    const eventId = param.get('id');
    const event = events.find(event => event._id == eventId);
    let detailsContainer = document.getElementById('cardDetails');
    createDetailsCard(event,detailsContainer);
}
startDetails();
import { createDetailsCard} from "./functions.js";
//Coloco en una variable el container que voy a necesitar
let detailsContainer = document.getElementById('cardDetails');
//Traigo la data y ejecuto las funciones
async function startDetails(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            // Guardar los eventos en una nueva variable
            const events = data.events; 
            //Capturo el ID pasado por la URL
            let queryString = location.search;
            let param = new URLSearchParams(queryString);
            let eventId = param.get('id');
            let event = events.find(event => event._id == eventId);
            if (!event) {
                detailsContainer.innerHTML= `<h1 class="d-flex justify-content-center">We didn't find results.</h1>`
            }
            //Creo y muestro la card correspondiente al ID
            createDetailsCard(event,detailsContainer);
        })
        //Muestro el error si no puedo cargar la data
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startDetails();
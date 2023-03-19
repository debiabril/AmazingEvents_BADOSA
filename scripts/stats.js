import { getData, getEventWithMostAssistance, insertData} from "./functions.js";

const startStats = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const events = data.events; // Guardar los eventos en una nueva variable
    const highestPercentage = document.getElementById("eventHighestPercentage");
    let eventWithHighestPercentageAssistance = getEventWithMostAssistance(events);
    insertData( eventWithHighestPercentageAssistance,highestPercentage); 
    

}
startStats()
import { getData, groupByCategory, insertData,} from "./functions.js";

const startStats = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const currentDate = data.currentDate; // Guardar la fecha en una nueva variable
    const events = data.events; // Guardar los eventos en una nueva variable
    let upcomingEvents = events.filter((event) => {
        return event.date > currentDate;});
    let pastEvents = data.events.filter((event) => {
        return event.date < currentDate;});
    let firstTable = document.getElementById("firstTable");
    let upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
    let pastEventsTBody= document.getElementById("pastEventsStatsByCategories")

    insertData(events,firstTable); 
    groupByCategory(upcomingEvents, upcomingEventsTBody)
    groupByCategory(pastEvents, pastEventsTBody)

}
startStats()
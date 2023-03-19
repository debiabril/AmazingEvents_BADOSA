import { getData, getEventWithMostAssistance, getEventWithLowestAssistance, getEventWithLargerCapacity, groupByCategory, insertData,} from "./functions.js";

const startStats = async () => {
    const data = await getData(); // Llamar a la función y esperar su resultado
    
    if(!data) { // Verficar si hay algún error cargando
        alert("Couldn't load data");
        return;
    }
    const currentDate = data.currentDate; // Guardar la fecha en una nueva variable
    const events = data.events; // Guardar los eventos en una nueva variable

    const upcomingEvents = events.filter((event) => {
        return event.date > currentDate;});
    const pastEvents = data.events.filter((event) => {
        return event.date < data.currentDate;});

    const highestPercentageTD = document.getElementById("eventHighestPercentage");
    const lowestPercentageTD = document.getElementById("eventLowestPercentage");
    const largestCapacityTD= document.getElementById("eventLargerCapacity");
    const upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
    const pastEventsTBody= document.getElementById("pastEventsStatsByCategories")


    let eventWithHighestPercentageAssistance = getEventWithMostAssistance(events);
    let eventLowestPercentageAssistance = getEventWithLowestAssistance(events);
    let eventLargestCapacity = getEventWithLargerCapacity(events);
    
    insertData( eventWithHighestPercentageAssistance,highestPercentageTD); 
    insertData(eventLowestPercentageAssistance, lowestPercentageTD);
    insertData(eventLargestCapacity,largestCapacityTD);
    

    groupByCategory(upcomingEvents, upcomingEventsTBody)
    groupByCategory(pastEvents, pastEventsTBody)





}
startStats()
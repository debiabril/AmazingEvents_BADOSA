import {groupByCategory, insertData,} from "./functions.js";

let firstTable = document.getElementById("firstTable");
let upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
let pastEventsTBody= document.getElementById("pastEventsStatsByCategories")

async function startStats(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
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
            
            insertData(events,firstTable); 
            groupByCategory(upcomingEvents, upcomingEventsTBody)
            groupByCategory(pastEvents, pastEventsTBody)
        }).catch(error => alert("Error loading data: ", error));
}
startStats()
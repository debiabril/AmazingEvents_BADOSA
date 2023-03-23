import {groupByCategory, insertData,} from "./functions.js";
//Coloco en variables los containers que voy a necesitar
let firstTable = document.getElementById("firstTable");
let upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
let pastEventsTBody= document.getElementById("pastEventsStatsByCategories")
//Traigo la data y ejecuto las funciones
async function startStats(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            // Guardar la fecha en una nueva variable
            const currentDate = data.currentDate; 
            // Guardar los eventos en una nueva variable
            const events = data.events; 
            //Filtrado de eventos por venir
            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;});
            //Filtrado de eventos pasados
            let pastEvents = data.events.filter((event) => {
                return event.date < currentDate;});
            //Ingreso de la data en la primer tabla
            insertData(events,firstTable); 
            //Ingreso de filas y columnas según categoría en la segunda tabla
            groupByCategory(upcomingEvents, upcomingEventsTBody)
            //Ingreso de filas y columnas según categoría en la tercer tabla
            groupByCategory(pastEvents, pastEventsTBody)
        })
        //Muestro el error si no puedo cargar la data
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startStats()
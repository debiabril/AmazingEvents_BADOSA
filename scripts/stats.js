const { createApp } = Vue

const app = createApp({
    data() {
        return {
        highestAttendance: '',
        lowestAttendance: '',
        largeCapacity: '',
        pastEvents:[],
        upcomingEvents:[],
        categories:{},
        categories2:[],
        revenues:0,
        attendancePercentage:0,
        }
    }
    ,created(){
        fetch('../json/amazing.json')
        .then(response => response.json())
        .then(data => {
            this.events = data.events
            this.theHighestAttendance(this.events)
            this.theLowestAttendance(this.events)
            this.theLargeCapacity(this.events)
            this.pastEvents= this.events.filter((e)=>e.date < data.currentDate)
            console.log(this.pastEvents);
            this.categories = this.getCategories(this.pastEvents);
            console.log(this.categories);
            this.categories2 = this.getCategories2(this.pastEvents);
            console.log(this.categories2);
            this.upcomingEvents = data.events.filter((e)=>e.date > data.currentDate);
            
        }
        )
        .catch(error => console.log(error));
    },
    mounted(){

    },
    methods: {
        theHighestAttendance(array){
            this.highestAttendance = array.reduce((prev, current) => (((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 > (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current).name);
        },
        theLowestAttendance(array){
            this.lowestAttendance = array.reduce((prev, current) => ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 < (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current).name;
        },
        theLargeCapacity(array){
            this.largeCapacity = array.reduce((prev, current) => 
            ((prev.capacity > current.capacity) ? prev : current)).name;
        },
        getCategories(array){
            array.forEach((event) => {
                if (!this.categories[event.category]) {
                this.categories[event.category] = []}
                this.categories[event.category].push(event);
            })
        },
        getCategories2(array){
            array.forEach(e =>{
                if(!this.categories2.includes(e.category)){
                    this.categories2.push(e.category)
                }
            })
        },
        calculateRevenues(events){
            events.forEach(event => {
                const revenue = event.price * ((event.assistance ? event.assistance : event.estimate));
                this.revenues += revenue;
            });
            return this.revenues;
        },
        calculateAttendancePercentage(events){
            let totalAssistance = events.reduce((total, event) => {
                return total + ((event.assistance ? event.assistance : event.estimate));
            }, 0);
            let capacity = events.reduce((cap, event) => {
                return cap + (event.capacity);
            }, 0);
            this.percentage= ((totalAssistance / capacity) * 100).toFixed(2);
        }
    }
    ,computed: {
    }
}).mount('#appStats')





/* import {groupByCategory, insertData,} from "./functions.js";
//Coloco en variables los containers que voy a necesitar
let firstTable = document.getElementById("firstTable");
let upcomingEventsTBody= document.getElementById("upcomingEventsStatsByCategories")
let pastEventsTBody= document.getElementById("pastEventsStatsByCategories") 
//Traigo la data y ejecuto las funciones
async function startStats(){
    await fetch("../json/amazing.json")
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
startStats() */
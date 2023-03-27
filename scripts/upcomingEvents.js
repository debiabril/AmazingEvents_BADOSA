const { createApp } = Vue

const app = createApp({
    data(){
        return {
            cards:[],
            allCards:[],
            cardDetails:[],
            currentDate:'',
            pastCards:[],
            upcomingCards:[],
            categories: [],
            categoriesSelected:[],
            inputText:'',
        }
    },
    created(){
        this.getData()
        /* this.upcomingEvents(allCards) */
    },
    mounted(){

    },
    methods:{
        getData(){
            fetch("../json/amazing.json")
                .then(response => response.json())
                .then(data => {
                    this.cards = data.events
                    this.allCards = this.cards
                    this.currentDate = data.currentDate
                    /* this.upcomingCards = data.events.filter((event) => {event.date > data.currentDate;}) */
                    this.upcomingCards = this.upcomingEvents(data.events)
                    this.getCategories(this.upcomingCards)
                })
                .catch(error => alert("Couldn't load data. Error: ", error))
        },
        getCategories(array){
            array.forEach(e =>{
                if(!this.categories.includes(e.category)){
                    this.categories.push(e.category)
                }
            })
        },
        goToDetails(id){
            this.cardDetails = this.cards.find(card => card._id == id)
        },/*
        pastEvents(allCards){
            this.pastCards = allCards.filter((e) => {e.currentDate < currentDate});
        },*/
        upcomingEvents(array){
            this.upcomingCards = array.filter((e) => {e.currentDate > currentDate});
        }, 
        
    },
    computed:{
        ultraFilter(){
            let firstFilter = this.cards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.allCards = firstFilter
            } else {
                this.allCards = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        },
        
    }
}).mount('#appUpcoming')




/* import { displayEvents, createCard, showCategoriesInCheckboxes, ultraFilter} from './functions.js';
//Coloco en variables los containers que voy a necesitar
let divCardsUpcomingEvents = document.getElementById('cardsUpcomingEvents');
let searchForm = document.querySelector('.formSearch');
let searchInput = document.querySelector('.formSearch > input');
let searchButton = document.querySelector('.formSearch > button');
let checkContainer = document.getElementById('formCategories');
//Traigo la data y ejecuto las funciones
async function startUpcoming(){
    await fetch("/json/amazing.json")
        .then(response => response.json())
        .then(data => {
            // Guardar la fecha en una nueva variable
            const currentDate = data.currentDate; 
            // Guardar los eventos en una nueva variable
            const events = data.events; 
            //Filtro los eventos por venir
            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;});
            //Crear y mostrar las Cards
            displayEvents(upcomingEvents, divCardsUpcomingEvents, createCard);
            //Mostrar las categorías en checkboxes
            showCategoriesInCheckboxes(upcomingEvents, checkContainer);
            //Escuchar los eventos del DOM y filtrar la data
            searchInput.addEventListener('input', ()=>{
                ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            searchForm.addEventListener('submit', ()=>{
                ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            searchButton.addEventListener('click', ()=>{
                ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
            checkContainer.addEventListener('change', ()=>{
                ultraFilter(divCardsUpcomingEvents, upcomingEvents, searchInput.value)
            });
        })
        //Muestro el error si no puedo cargar la data
        .catch(error => alert("Couldn't load data. Error: ", error));
}
startUpcoming()

 */
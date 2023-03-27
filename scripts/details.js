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
    },
    mounted(){

    },
    methods:{
        getData(){
            fetch('/json/amazing.json')
                .then(response => response.json())
                .then(data => {
                    this.cards = data.events
                    this.allCards = this.cards
                    this.currentDate = data.currentDate
                    this.getCategories(data.events)
                    let queryString = location.search;
                    let param = new URLSearchParams(queryString);
                    let eventId = param.get('id');
                    this.cardDetails = cards.find(card => card._id == eventId);
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
        /* goToDetails(id){
            this.cardDetails = this.cards.find(card => card._id == id)
        } */
        /* pastEvents(array){
            array.filter((e) => {e.currentDate < currentDate});
        } */
    },
    computed:{
        ultraFilter(){
            let firstFilter = this.cards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.allCards = firstFilter
            } else {
                this.allCards = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        }
    }
}).mount('#appDetails')











/* 
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
startDetails(); */
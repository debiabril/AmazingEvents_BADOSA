const { createApp } = Vue
const app = createApp({
    data(){
        return {
            cardDetails:[],
            pastCards:[],
            pCards:[],
            cardDetailsBoolean: false,
            cardsBoolean: true,
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
            fetch("../json/amazing.json")
                .then(response => response.json())
                .then(data => {
                    this.pastCards = data.events.filter((e)=>e.date < data.currentDate)
                    this.pCards= this.pastCards 
                    this.getCategories(this.pastCards)
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
            this.cardDetails = this.pCards.find(card => card._id == id),
            this.cardsBoolean = false,
            this.cardDetailsBoolean = true            
        },
        goHome(){
            this.cardDetailsBoolean = false,
            this.cardsBoolean = true
        },
    },
    computed:{
        ultraFilter(){
            let firstFilter = this.pCards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.pastCards = firstFilter
            } else {
                this.pastCards = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        },
    }
}).mount('#appPast')
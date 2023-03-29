const { createApp } = Vue

const app = createApp({
    data() {
        return {
        highestAttendance: '',
        lowestAttendance: '',
        largeCapacity: '',
        pastEvents:[],
        upcomingEvents:[],
        events:[],
        categories:[],
        revenues:0,
        attendancePercentage:0,
        }
    }
    ,created(){
        this.getData()
    },
    mounted(){

    },
    methods: {
        getData(){
        fetch('../json/amazing.json')
        .then(response => response.json())
        .then(data => {
            this.events = data.events
            this.eventWithHighestAttendance(this.events)
            this.eventWithLowestAttendance(this.events)
            this.eventWithLargestCapacity(this.events)
            this.upcomingEvents = this.events.filter((e)=>e.date > data.currentDate);
            this.pastEvents= this.events.filter((e)=>e.date < data.currentDate)
        })        
        .catch(error => console.log(error));
        },
        eventWithHighestAttendance(array){
            let eventWithHighestAttendance = "";
            let highestAttendancePercentage = -1;
            array.forEach((event) => {
                const percentage = ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100;
                if (percentage > highestAttendancePercentage) {
                highestAttendancePercentage = percentage;
                eventWithHighestAttendance = event.name;
                }
            });
            this.highestAttendance = eventWithHighestAttendance;
        },
        eventWithLowestAttendance(array){
            this.lowestAttendance = array.reduce((prev, current) => ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 < (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current).name;
        },
        eventWithLargestCapacity(array){
            this.largeCapacity = array.reduce((prev, current) => 
            ((prev.capacity > current.capacity) ? prev : current)).name;
        },
        getCategories(array){
            this.categories=[]
            array.forEach(e =>{
                if(!this.categories.includes(e.category)){
                    this.categories.push(e.category)
                }
            })
        },
        calculateRevenues(category, array){
            this.revenues = 0;
            let arrayFilter = array.filter((e)=>e.category == category)
            arrayFilter.forEach(event => {
                const revenue = event.price * ((event.assistance ? event.assistance : event.estimate));
                this.revenues += revenue;
            });
            this.revenues;
        },
        calculateAttendancePercentage(category, array){
            let arrayFilter = array.filter((e)=>e.category == category)
            let totalAssistance = 0;
            let capacity = 0;
            totalAssistance = arrayFilter.reduce((total, event) => {
                return total + ((event.assistance ? event.assistance : event.estimate));
            }, 0);
            capacity = arrayFilter.reduce((cap, event) => {
                return cap + (event.capacity);
            }, 0);
            this.attendancePercentage= ((totalAssistance / capacity) * 100).toFixed(2);
        }
    }
    ,computed: {
    }
}).mount('#appStats')


// función que obtiene las categorías únicas de los eventos
const uniqueCategories = (events) => {
    return events.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc;
    }, []);
};
  // función que crea el fragmento con los checkboxes para cada categoría
const createCategoryCheckboxes = (array) => {
    const fragmentForm = document.createDocumentFragment();
    const categories = uniqueCategories(array);
    categories.map(category => {
        const div = document.createElement('div');
        div.classList="d-flex flex-wrap form-check form-switch";
        div.innerHTML=` 
        <label class="d-inline-flex my-2 mx-2">
        <input class="form-check-input me-3" value="${category}" 
        name="categories" role="switch" for="${category}" id="${category}" type="checkbox">${category}
        </label>`;
    fragmentForm.appendChild(div);
    });
    return fragmentForm;
}

// función que muestra los checkboxes en el formulario
const showCategoriesInCheckboxes = (array, container) => {
    const formCategories = container;
    const fragmentForm = createCategoryCheckboxes(array);
    let showCategories = formCategories.appendChild(fragmentForm);
}

//funciones para recorrer los eventos y que crear las cards de los eventos 
function createCard(event, ruta) {
    let div = document.createElement('div');
    div.classList='card mx-2 my-2';
    div.innerHTML=`
        <img src="${event.image}" class="card-img-top" alt="${event.category}">
        <div class="card-body text-center">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex justify-content-between">
                <p class="pt-2">Price: $${event.price}</p>
                <a href="${ruta}details.html?id=${event._id}" class="btn btn-nav align-self-center go">Go to Details</a>
            </div>
        </div>`;
    return div;
}
function renderCards(elements, container, renderFunction, ruta="./") {
    let fragmento = document.createDocumentFragment();
    elements.forEach(element => {
        const card = renderFunction(element,ruta);
        fragmento.appendChild(card);
    });
    container.appendChild(fragmento);
}
//Funcion para mostrar las cards
function displayEvents(events, container, renderFunction, ruta) {
    if (events.length == 0) {
        container.innerHTML= `<h1>We didn't find results in your search. Please adjust the filters.</h1>`
    }
    renderCards(events, container, renderFunction, ruta);
}

//Funcion que crea las Cards de Details según el ID
function createDetailsCard(event, container) {
    let div = document.createElement('div');
    div.classList='row g-0';
    div.innerHTML=`
    <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img src="${event.image}" id="cardImg" class="img-fluid borderRadius " alt="${event.name}">
    </div>
    <div class="col-md-6">
        <div class="card-body">
            <dl class="card-text">
                <dt>Name</dt>
                <dd>${event.name}</dd>
                <dt>Date</dt>
                <dd>${event.date}</dd>
                <dt>Description</dt>
                <dd>${event.description}</dd>
                <dt>Category</dt>
                <dd>${event.category}</dd>
                <dt>Place</dt>
                <dd>${event.place}</dd>
                <dt>Capacity</dt>
                <dd>${event.capacity}</dd>
                <dt>${event.assistance ? "Asistence" : "Estimate"}</dt>
                <dd>${event.assistance ? event.assistance : event.estimate}</dd>
                <dt>Price</dt>
                <dd>${event.price}</dd>
            </dl>
            <div class="d-flex justify-content-end">
                <a href="javascript:history.back()" class="btn btn-details align-self-center go">Go Back</a>
            </div>
        </div>
    </div>`;
    return container.appendChild(div)
}

//Funcion para el Search
function filterByName(array, name){
    let filtersArray = array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    return filtersArray;
}
//Filtrado por categorias
function filterByCategories(array){
    const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

//Función para que funcionen juntos los filtros de Search y Categorias
function ultraFilter(container, array, name, ruta="./"){
    window.event.preventDefault();
    container.innerHTML=``;
    let filterArrayName = filterByName(array, name);
    let filterAll = filterByCategories(filterArrayName);
    displayEvents(filterAll, container, createCard, ruta);
}

//Función que obtiene el nombre del evento con mayor porcentage de asistencia
function getEventWithMostAssistance(array){
    let eventWithHighestAttendance = "";
    let highestAttendancePercentage = -1;
    array.forEach((event) => {
        const percentage = ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100;
        if (percentage > highestAttendancePercentage) {
        highestAttendancePercentage = percentage;
        eventWithHighestAttendance = event.name;
        }
    });
    return eventWithHighestAttendance 
}
//Función que obtiene el nombre del evento con menor asistencia
function getEventWithLowestAssistance(array) {
    let eventsWithLowestAttendance = [];
    let lowestAttendancePercentage = 101;
    array.forEach((event) => {
        const percentage = ((event.assistance ? event.assistance : event.estimate)/ event.capacity) * 100;
        if (percentage < lowestAttendancePercentage) {
            lowestAttendancePercentage = percentage;
            eventsWithLowestAttendance = [event.name];
        } 
    eventsWithLowestAttendance= String(eventsWithLowestAttendance);
    });
    return eventsWithLowestAttendance;
}
//Funcion que retorna el nombre del evento con mayor capacidad
function getEventWithLargerCapacity(array) {
    let eventWithLargestCapacity = array.reduce((prevEvent, actualEvent) => {
        return (prevEvent.capacity > actualEvent.capacity) ? prevEvent : actualEvent;
    }).name;
    return eventWithLargestCapacity;
}
//Función que inserta la data que deseemos con innerText en donde le indiquemos
function insertData(array,container){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="text-center">${getEventWithMostAssistance(array)}</td>
                    <td class="text-center">${getEventWithLowestAssistance(array)}</td>
                    <td class="text-center">${getEventWithLargerCapacity(array)}%</td>`;
    container.appendChild(tr);
}

//Funcion para calcular las ganancias totales
function calculateRevenues(events){
    let revenues = 0;
    events.forEach(event => {
        const revenue = event.price * ((event.assistance ? event.assistance : event.estimate));
        revenues += revenue;
    });
    return revenues;
}
//Funcion para calcular el porcentaje de asistencia, se puede  usar con estimate o con assistance
function calculateAttendancePercentage(events){
    const totalAssistance = events.reduce((total, event) => {
        return total + ((event.assistance ? event.assistance : event.estimate));
    }, 0);
    //const capacity = events[0].capacity;
    const capacity = events.reduce((cap, event) => {
        return cap + (event.capacity);
    }, 0);
    return ((totalAssistance / capacity) * 100).toFixed(2);
}
//función para crear las filas con las columnas 
function createTableRow(category, revenues, attendancePercentage, container){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${category}</td>
                    <td class="text-end">$${revenues}</td>
                    <td class="text-end">${attendancePercentage}%</td>`;
    container.appendChild(tr);
}

//Función que agrupa por categorías según array y crea las filas necesarias para ser mostradas
function groupByCategory(array, container) {
    const groupedCategories = {};
    array.forEach((event) => {
        if (!groupedCategories[event.category]) {
        groupedCategories[event.category] = [];
        }
        groupedCategories[event.category].push(event);
    });

    for (const category in groupedCategories) {

        const events = groupedCategories[category];
        const revenues = calculateRevenues(events);
        const attendancePct = calculateAttendancePercentage(events);
        createTableRow(category, revenues, attendancePct, container);
    }
}

// En loadData() solo se realiza la solicitud fetch 
async function loadData(){
    const response = await fetch("/json/amazing.json"); // Espera a que termine la solicitud y obtiene la respuesta
    const dataJson = await response.json(); // Obtener los datos en formato JSON de la respuesta.
    return dataJson; // Devolver los datos JSON obtenidos.
}

//get Data llama a loadData() y asigna sus valores a una variable para luego poder usarlos
async function getData() {
    try {
        const dataJson = await loadData(); // Llamar a loadData()
        // Obtener los datos
        const currentDate = dataJson.currentDate;
        const events = dataJson.events;
        // Retorno las variables que necesito
        return { currentDate, events };
    } catch (error) {
        alert("Error loading data: ", error);
        return null;
    }
}

export { createCard, renderCards, displayEvents, showCategoriesInCheckboxes, createDetailsCard, ultraFilter, getData,insertData,groupByCategory, };
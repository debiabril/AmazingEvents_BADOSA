function createCard(event) {
    let div = document.createElement('div');
    div.classList='card mx-2 my-2';
    div.innerHTML=`
        <img src="${event.image}" class="card-img-top" alt="${event.category}">
        <div class="card-body text-center">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex justify-content-between">
                <p class="pt-2">Price: $${event.price}</p>
                <a href="./pages/details.html" class="btn btn-nav align-self-center go">Let's Go</a>
            </div>
        </div>`;
    return div;
}

function renderCards(elements, container, renderFunction) {
    let fragmento = document.createDocumentFragment();
    elements.forEach(element => {
        const card = renderFunction(element);
        fragmento.appendChild(card);
    });
    container.appendChild(fragmento);
}

function displayEvents(events, container, renderFunction) {
    renderCards(events, container, renderFunction);
}

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
        div.classList="d-flex flex-wrap";
        div.innerHTML=` 
        <label class="d-inline-flex my-2 mx-3">
        <input class="form-check-input me-3" value="${category}" 
        name="categories" type="checkbox">${category}
        </label>`;
    fragmentForm.appendChild(div);
    });
    return fragmentForm;
}
// función que muestra los checkboxes en el formulario
const showCategories = (array) => {
    const formCategories = document.getElementsByClassName('formCategories')[0];
    const fragmentForm = createCategoryCheckboxes(array);
    let showCategories = formCategories.appendChild(fragmentForm);
}

export { createCard, renderCards, displayEvents, showCategories, };
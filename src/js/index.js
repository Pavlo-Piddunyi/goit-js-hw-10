import { Notify } from "notiflix"
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import '../css/style.css'
import { fetchBreeds, fetchCatByBreed } from "./cat-api"

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    cardCat: document.querySelector('.cat-info')
}

elements.select.classList.add('is-hidden')
elements.error.classList.add('is-hidden')

fetchBreeds()
    .then(data => {
        createOptions(data)
    })
    .then(() => new SlimSelect({ select: '.breed-select' }))
    .catch(() => errorMessage())

function createOptions(arr) {
    elements.select.classList.remove('is-hidden')
    elements.loader.classList.add('is-hidden')
    elements.select.innerHTML = `<option data-placeholder="true">Select a cat</option>${arr.map(({ id, name }) => `
        <option value="${id}">${name}</option>
        `)
        .join('')}`
}

elements.select.addEventListener('change', onInput)


function errorMessage() {
    elements.loader.classList.add('is-hidden')
    return Notify.failure(`Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000 })
}

function onInput(event) {
    elements.cardCat.classList.add('is-hidden')
    elements.loader.classList.remove('is-hidden')

    fetchCatByBreed(event.target.value)
        .then(data => createCard(data[0]))         
        .catch(() => errorMessage());   
}

function createCard(data) {
  const { breeds, url } = data;
  const { name, temperament, description } = breeds[0];
    elements.cardCat.innerHTML = `
        <div class="img-card"><img src="${url}" alt="picture" width="100%">
        </div>
        <div class="description">
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament: </strong>${temperament}</p>
        </div>
    `
    elements.loader.classList.add('is-hidden')
    elements.cardCat.classList.remove('is-hidden')
}
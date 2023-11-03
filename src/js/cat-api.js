import axios from "axios"

const API_KEY = 'live_urH0CZmamqzz7CkcdgVl6WBA5cFPgc6P0sVXNDWumHB4QR9knZXBoi11UKzpvC8F';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common["x-api-key"] = `${API_KEY}`;


function fetchBreeds() {
    return fetch(BASE_URL)
        
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
    })
}

function fetchCatByBreed(breedId) {
    const CAT_URL = `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&es/sed_ids=${breedId}`
    return fetch(CAT_URL)
        
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
    })
}

export {fetchBreeds, fetchCatByBreed}

export default class CatAPI {
    constructor() {
        this.baseurl = "https://api.thecatapi.com/v1"
        this.myHeaders = new Headers({
            "x-api-key": "VOTRE CLE ICI",
        })
    }

    myFetch(url) {
        return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/${url}`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }

    getImage(imageId) {
        return this.myFetch(`images/${imageId}`)
    }

    searchBreeds(filter) {
        return this.myFetch(`breeds/search?q=${filter}`)
    }

    getBreeds() {
        return this.myFetch(`breeds`)
    }

    getBreed(breedId) {
        return this.myFetch(`images/search?breed_ids=${breedId}`)
    }
}
import BaseController from './basecontroller.js'
import CatAPI from "../services/catapi.js"

class IndexController extends BaseController {
    constructor() {
        super()
        this.api = new CatAPI()
        this.breedsElem = $("#breeds")
        const filter = sessionStorage.getItem("filter")
        if (filter === null) {
            this.load()
        } else {
            $("#breedSearch").value = filter
            this.searchBreeds()
        }
    }

    displayBreeds(breeds) {
        if (breeds !== undefined) {
            let content = ""
            breeds.forEach(breed => {
                //content += `<li class="list-group-item" onclick="indexController.displayBreedInModal('${breed.id}', '${breed.name}')" data-bs-toggle="modal" data-bs-target="#breed_modal" ><div class="row" id="li_${breed.id}">${breed.name}</div>`
                content += `<li class="list-group-item" onclick="indexController.displayBreedInPage('${breed.id}', '${breed.name}')" ><div class="row">${breed.name}</div>`
                if ((breed.image !== undefined) && (breed.image.url !== undefined)) {
                    content += `<div class="row" id="li_${breed.id}"><img src="${breed.image.url}" style="width:120px;"/></div> </li>`
                } else {
                    content += `<div class="row" id="li_${breed.id}"></div></li>`
                }
            })
            this.breedsElem.innerHTML = content
            breeds.forEach(async breed =>  {
                if (breed.image === undefined && breed.reference_image_id !== undefined) {
                    const url = await this.api.getImage(breed.reference_image_id)
                    if (url !== undefined) {
                        $(`#li_${breed.id}`).innerHTML = `<img src="${url}" style="width:120px;"/>`
                    }
                }
            })
        } else {
            this.toast("errorLoading")
            this.breedsElem.removeChild(this.loader)
        }
    }

    async load() {
        this.breedsElem.appendChild(this.loader)
        this.displayBreeds(await this.api.getBreeds())
    }

    async searchBreeds() {
        const filter = $("#breedSearch").value
        if (filter !== "") {
            this.breedsElem.innerHTML = ""
            this.breedsElem.appendChild(this.loader)
            this.displayBreeds(await this.api.searchBreeds(filter))
            sessionStorage.setItem("filter", filter)
        } else {
            sessionStorage.removeItem("filter")
            await this.load()
        }
    }

    async displayBreedInPage(breedId, breedName) {
        this.breedId = breedId
        this.breedName = breedName
        navigate("details")
    }

    async displayBreedInModal(breedId, breedName) {
        const img = $("#breed_img")
        img.innerHTML = ""
        img.appendChild(this.loader)
        const breeds = await this.api.getBreed(breedId)
        if (breeds === undefined) {
            this.toast("errorLoadingBreed")
            img.removeChild(this.loader)
            return
        }
        const breed = breeds[0]
        $("#breed_name").innerHTML = breedName
        if (breed.url !== undefined) {
            img.innerHTML = `<img src="${breed.url}" style="width:100%;"/>`
        }
    }

}

export default () => window.indexController = new IndexController()

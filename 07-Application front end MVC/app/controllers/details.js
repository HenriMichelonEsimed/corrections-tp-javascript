import BaseController from "./basecontroller.js"
import CatAPI from "../services/catapi.js"

class DetailsController extends BaseController {
    constructor() {
        super()
        this.api = new CatAPI()
        this.breedId = indexController.breedId
        this.breedName = indexController.breedName
        this.img = $("#breed_img")
        this.load()
    }

    async load() {
        this.img.innerHTML = ""
        this.img.appendChild(this.loader)
        const breeds = await this.api.getBreed(this.breedId)
        if (breeds === undefined) {
            this.toast("errorLoadingBreed")
            this.img.removeChild(this.loader)
            return
        }
        const breed = breeds[0]
        $("#breed_name").innerHTML = this.breedName
        if (breed.url !== undefined) {
            this.img.innerHTML = `<img src="${breed.url}" style="width:100%;"/>`
        }
    }
}

export default () => window.detailsController = new DetailsController()
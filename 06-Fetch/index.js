console.log("Exercice 6")

const myHeaders = new Headers({
    "x-api-key": "VOTRE CLE ICI",
})

const loader = document.createElement("img")
loader.src = "loader.gif"
loader.style.width = "100px"
loader.style.margin = "auto"

$("#breeds").appendChild(loader)
fetch("https://api.thecatapi.com/v1/breeds", {headers: myHeaders})
    .then(response => response.json())
    .then(data => {
        let content = ""
        data.forEach(breed => {
            content += `<li class="list-group-item" onclick="displayBreed('${breed.id}')" data-bs-toggle="modal" data-bs-target="#breed_modal"><div class="row">${breed.name}</div>`
            if ((breed.image !== undefined) && (breed.image.url !== undefined)) {
                content += `<div class="row"><img src="${breed.image.url}" style="width:120px;"/></div></li>`
            } else {
                content += '</li>'
            }
        })
        $("#breeds").innerHTML = content
    })

window.displayBreed = function (breed_id) {
    const img = $("#breed_img")
    img.innerHTML = ""
    img.appendChild(loader)
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_id}`, {headers: myHeaders})
        .then(response => response.json())
        .then(breeds =>  {
            const breed = breeds[0]
            $("#breed_name").innerHTML = breed.breeds[0].name
            if (breed.url !== undefined) {
                img.innerHTML = `<img src="${breed.url}" style="width:100%;"/>`
            }
        })
}
console.log("Exercice 4")

window.play = function () {
    let value = Math.floor(Math.random() * 10)
    $(`.number` , div => {
        div.style.backgroundColor = (div.innerText != value ? "grey" : "antiquewhite")
    })
}

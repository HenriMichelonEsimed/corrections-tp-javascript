console.log("Exercice 5")

let HISTORY_KEY = "history"
let history = []

let previousHistory = localStorage.getItem(HISTORY_KEY)
if (previousHistory != null) {
    history = JSON.parse(previousHistory)
    displayHistory()
}

function displayHistory () {
    const list = $("#history")
    list.innerHTML = ""
    history.forEach(entry => {
        const ul = document.createElement("li")
        ul.classList.add("list-group-item")
        ul.innerHTML = entry
        list.appendChild(ul)
    })
}
window.displayHistory = displayHistory

window.play = function () {
    let value = Math.floor(Math.random() * 10)
    $(`.number` , div => {
        div.style.backgroundColor = (div.innerText != value ? "grey" : "antiquewhite")
    })
    let now = new Date().toLocaleString()
    history.push(`${now} : ${value}`)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    displayHistory()
}

console.log("Exercice 3")

// utilisation de parseFloat() pour forcer l'opérateur + entre deux nombre (éviter les concaténation de chaînes)
function add(a, b) { return parseFloat(a) + parseFloat(b) }
function sub(a, b) { return parseFloat(a) - parseFloat(b) }
function mul(a, b) { return parseFloat(a) * parseFloat(b) }
function div(a, b) { return parseFloat(a) / parseFloat(b) }

const functions = { "+":add, "-":sub, "*": mul, "/":div }

const history = new Set()

window.calc=function() {
    const alert = document.getElementById("error_op")
    alert.style.display = "none"

    let left_op = document.getElementById("left_op").value
    let right_op = document.getElementById("right_op").value
    if ((left_op === "") || (right_op === "")) {
        alert.style.display = "block"
        return
    }
    const op = document.getElementById("op").value
    if (op.length !== 1) {
        return
    }

    const result = functions[op](left_op, right_op)
    document.getElementById("result").innerHTML = result

    const history_entry = `${left_op} ${op} ${right_op}`
    history.add(history_entry)

    const list = document.getElementById("history")

/*
    let history_content = ""
    history.forEach(entry => {
        history_content += `<li class='list-group-item'>${entry}</li>`
    })
    list.innerHTML = history_content
 */
    list.innerHTML = ""
    history.forEach(entry => {
        const ul = document.createElement("li")
        ul.classList.add("list-group-item")
        ul.innerHTML = entry
        list.appendChild(ul)
    })



}
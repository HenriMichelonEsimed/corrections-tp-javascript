console.log("Exercice 2")

function traitement(message, f, n) {
    const resultat = f(n)
    console.log(`${message}(${n})=${resultat}`)
}

function somme(n) {
    if (n <= 0) {
        return
    }
    let resultat = 0
    for (let i = 1; i <= n; i++) {
        resultat += i
    }
    return resultat;
}

function fact(n) {
    if (n < 0) {
        return;
    }
    if (n === 0) {
        return 1
    }
    return fact(n - 1) * n
}

function somme_tableau(t) {
    let resultat = 0
    for (let valeur of t) {
        resultat += valeur
    }
    return resultat
}

function majuscules(s) {
    let resultat = ""
    let debut_mot = true
    for(let car of s) {
        if (debut_mot) {
            resultat += car.toUpperCase()
        } else {
            resultat += car
        }
        debut_mot = (car === " ")
    }
    return resultat
}

function exemple1(n) {
    if (n < 0) {
        return
    }
    return n * 2
}
traitement("Exemple", exemple1, -1)
traitement("Exemple", exemple1, 4)

traitement("somme", somme, -1)
traitement("somme", somme, 0)
traitement("somme", somme, 5)
traitement("somme", somme, 12)

traitement("somme tableau", somme_tableau, [1, 2, 3, 4])
traitement("somme tableau", somme_tableau, [1.5, 2.3, -5])

traitement("factorielle", fact, -1)
traitement("factorielle", fact, 0)
traitement("factorielle", fact, 5)
traitement("factorielle", fact, 12)

traitement("majuscules", majuscules, "cours de javascript")
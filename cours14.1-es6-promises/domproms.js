function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Créer n boutons
function createButtons(n) {

    for (let i=0; i<n; i++) {
        let p = document.createElement("P")
        let btn = document.createElement("BUTTON")
        let color = `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`
        btn.appendChild( document.createTextNode( color ) )
        btn.color = function() {
            this.style = "background-color: " + this.childNodes[0].nodeValue
        }
        p.appendChild(btn)
        document.getElementById("buttons").appendChild(p)
    }
}

// Rend visible le "p" indiquant qu'au moins un bouton a été cliqué
// Spécifie le bouton cliqué
function firstClicked(button) {
    document.getElementById("firstclicked").childNodes[0].nodeValue = document.getElementById("firstclicked").childNodes[0].nodeValue + button.childNodes[0].nodeValue
    document.getElementById("firstclicked").style = ""
}

// Rend visible le "p" indiquant que tous les boutons ont été cliqués
function allClicked() {
    document.getElementById("allclicked").style = ""
}

// Doit retourner un tableau de promesses, une promesse par bouton
// Chaque promesse devra être résolue quand le bouton est cliqué
function getPromises() {
    const buttons = document.getElementsByTagName("button")
    let proms = []

    // TODO (1)

    for (let i = 0; i<buttons.length; i++) {
        let button = buttons[i];
        proms.push( new Promise( function(resolve, reject){
            button.addEventListener("click", (event) => {
                resolve(event.target)
            })

        }))
        
    }

    return proms
}

// Gestion de chaque bouton cliqué:
// Changer la couleur du bouton lorsque cliqué en
// invoquant la méthode "color" sur le bouton qui a été appuyé
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForButtons(proms) {
    // TODO (2)
    proms.forEach((prom) => {
        prom.then( (button) =>  {
            button.color()
        })
        
    });

}

// Attendre que le premier bouton ne soit cliqué
// Invoquer la méthode firstClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForFirstButton(proms) {
    // TODO (3)
    Promise.race(proms).then((button) => {
        firstClicked(button);
    })
}

// Attendre que tous les boutons aient été cliqués
// Invoquer la méthode allClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForAllButtons(proms) {
    // TODO (4)
    Promise.all(proms).then((button) => {
        allClicked();
    })
}


window.addEventListener("load", () => {
    // Créer des boutons aléatoires
    createButtons( getRandomInt( 3 ) + 3 )

    // Récupérer les promesses
    const proms = getPromises()

    // Fonctions qui attendent la résolution des promesses
    waitForButtons(proms)
    waitForFirstButton(proms)
    waitForAllButtons(proms)
})

Promise.most = function(proms) {
    nbSucces = 0;
    proms.forEach((prom) => {
        prom.then( () =>  {
            nbSucces++;
        })
        
    });

    if (nbSucces >= (proms.length/2)){
        
    }
}
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

// Function to parse the URL and extract the value of a parameter
// source: ChatGPT
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkHandler( event ) {
    var url = window.location.href.split('?')[0];
    if (event.target.checked)
        url = url + "?checked=true"

    window.location = url
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

    for (let i=0; i<buttons.length; i++) {
        let button = buttons[i]
        proms.push( new Promise( function(resolve,reject) {

            button.addEventListener("click", (event) => {
                resolve(event.target)
            })
            
        }) )
    }

    return proms
}

// Gestion de chaque bouton cliqué:
// Changer la couleur du bouton lorsque cliqué en
// invoquant la méthode "color" sur le bouton qui a été appuyé
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForButtons(proms) {
    
    const ordered = (getParameterByName("checked") == "true")

    if (ordered) {

        // TODO (1): l'ordre de cochage est important (il faut cocher tous
        // les éléments dans l'ordre)
        for (let i = 0; i < proms.length; i++) {
            const button = await proms[i];
            button.color();

            
        }
        
        
        
    } else {

        // TODO (2): l'ordre de cochage n'a pas d'importance
        proms.forEach( async (prom) => {
            const button = await prom;
            button.color();
        })
        
    }
}

// Attendre que le premier bouton ne soit cliqué
// Invoquer la méthode firstClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForFirstButton(proms) {
    // TODO (3)
    const button = await Promise.race(proms);
    firstClicked(button);
}

// Attendre que tous les boutons aient été cliqués
// Invoquer la méthode allClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
async function waitForAllButtons(proms) {
    // TODO (4)
    await Promise.all(proms);
    
    allClicked()
}

window.addEventListener("load", () => {
    // Créer des boutons aléatoires
    createButtons( getRandomInt( 3 ) + 3 )

    // Configurer handler checkBox
    document.getElementById("ordered").checked = getParameterByName("checked") == "true"
    document.getElementById("ordered").addEventListener("click", checkHandler)
    
    // Récupérer les promesses
    const proms = getPromises()

    // Fonctions qui attendent la résolution des promesses
    waitForButtons(proms)
    waitForFirstButton(proms)
    waitForAllButtons(proms)
})

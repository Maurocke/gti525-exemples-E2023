const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

class Contact {
    constructor(id, firstName, lastName) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }
}

let contacts = []
contacts.find = function(id, lastName) {
    if (lastName) {
        // Search by firstName and lastName
        let firstName = id
        let matches = []
        contacts.forEach( (contact) => {
            if (firstName == contact.firstName && lastName == contact.lastName) {
                matches.push( contact )
            }
        })
        return matches
    } else {
        for (let i=0; i<contacts.length; i++) {
            if (contacts[i].id == id)
                return contacts[i]
        }
        return null
    }
}

// Route on the collection. Supported operations:
// get (all, all with pagination, all from search)
// post (add new contact)
// TODO
app.route("/contacts/")
    .get((req, res) => {

    })

// Route on a specific contact id. Supported operations:
// get (get specific contact)
// put (replace specific contact)
// patch (partially replace specific contact)
// delete (delete specific contact)
// TODO
app.route("/contacts/:id")
    .get((req, res) => {
        
    })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable

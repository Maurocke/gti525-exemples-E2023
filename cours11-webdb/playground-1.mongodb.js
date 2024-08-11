/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('restaurants');


//db.restaurants.find( {'name': 'Tim Hortons'}).forEach( (resto) => {
    //print( resto.name + ": " + resto.address.building + " " + resto.address.street + " " + resto.address.zipcode)
    // Look for restaurants with same zipcode
    //db.restaurants.find( {"address.zipcode": resto.address.zipcode} ).forEach( (match) => {
    //print( " " + match.name + ": " + match.address.building + " " + match.address.street + " " + match.address.zipcode)
    //});
    //});
    
    //{ $and: [ { "name": "Tim Hortons" }, { "adress.zipcode": "10001" } ] }

db.restaurants.updateMany( {
    "borough": "Queens",
    "restaurant_id": {$gt: "42000000"},
    "cuisine": "Not Listed/Not Applicable"
    }, {
    $set: {"cuisine": "Pizza"}
    })
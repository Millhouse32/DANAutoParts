const { json } = require('express');
var mongodb = require('mongodb');

var connected = false;
var db = null;

mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }).then(connection=>{
    connected = true;
    db = connection.db('DANAutoParts');
    console.log("DB Connection Successful!");
}).catch(error=> {
    console.log("Error in connection to DB");
});

async function queryCardsCollection() {
    if (connected) {
        // get data from db

        let jsonResponse = {
            "handsetCards": [],
            "webCards": [],
        };

        const cardsCollectionArray = await db.collection('cards').find().toArray();
        cardsCollectionArray.forEach(element => {
            let handsetElement = {}
            handsetElement['imageName'] = element['imageName'];
            handsetElement['title'] = element['title'];
            handsetElement['rows'] = element['handsetRows'];
            handsetElement['cols'] = element['handsetCols'];
            handsetElement['content'] = element['content'];
            handsetElement['contentType'] = element['contentype'];
            jsonResponse.handsetCards.push(handsetElement);

            let webElement = {};
            webElement['imageName'] = element['imageName'];
            webElement['title'] = element['title'];
            webElement['rows'] = element['webRows'];
            webElement['cols'] = element['webCols'];
            webElement['content'] = element['content'];
            webElement['contentType'] = element['contentype'];
            jsonResponse.webCards.push(webElement);
        })
        return jsonResponse;
    }
    else {
        return null;
    }
}

module.exports = { queryCardsCollection };
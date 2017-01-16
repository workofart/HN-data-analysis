var Mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var db = 'hn-db';
var _ = require('underscore');


function getCollection (collName, callback) {
    Mongo.connect(url+db, function (err, db) {
        console.log('Connection successful to db ' + db);
        var collection = db.collection(collName);
        callback(collection);
        db.close();
    });

}


// Define the process callback function
// Utility function for processing first level kid comments
var processDocs = function (collection, doc) {
    if (_.has(doc, 'kids') && doc.kids.length > 0) {
        var kids = doc.kids;
        var numKids = kids.length;
        // console.log('Total kids: ' + numKids);
        for(var j = 0; j < numKids; j++) {
            // console.log('kid [' + j + ']:' + JSON.stringify(kids[j]));
            var kidId = kids[j];
            var currentJ = j;
            collection.findOne({'id' : kidId}, function (err, kid) {
                // console.log(kid);
                kids[currentJ] = kid;
                // doc.kids = kids;
                if (currentJ == numKids - 1) {
                    console.log(JSON.stringify(doc));
                }
            });
        }
    }
};

/**
 * @param collection
 */
// Beware that due to the async nature of db queries, the array positions might be off
// Store it into a temp var and use it later to prevent the pointer from moving on the intended position
var getKids = function(collection) {
    collection.find({'type' : 'story', 'kids' : { $exists: true }, 'descendants' : {$gt : 0}}).limit(3).toArray(function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
            // console.log('\n\nReading doc: ' + i);
            // console.log('Total docs: ' + docs.length);
            processDocs(collection, docs[i]);
        }
    });
};

var getTopStories = function(collection) {
    collection.find({'type' : 'story'},{'score' : 1, 'title' : '1', 'id' : '1'}).sort({'score' : -1}).limit(10).toArray(function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
            // console.log('\n\nReading doc: ' + i);
            // console.log('Total docs: ' + docs.length);
            // processDocs(collection, docs[i]);
            console.log(JSON.stringify(docs[i]));
        }
    });
};


getCollection('allItems', getTopStories);

//
// collection.find({'id' : 600027}).toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// })

// db = connect('localhost:27017/hn-db');


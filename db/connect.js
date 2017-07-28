var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/hn-db';
var db = mongoose.createConnection(url);

var _ = require('underscore');


// module.exports.getCollection = function(collName, callback) {
//     Mongo.connect(url+db, function (err, db) {
//         console.log('Connection successful to db ' + db);
//         var collection = db.collection(collName);
//         callback(collection);
//         db.close();
//     });
//
// };

module.exports.db = db;

//
// collection.find({'id' : 600027}).toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// })

// db = connect('localhost:27017/hn-db');


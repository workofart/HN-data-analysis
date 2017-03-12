var connection = require('../connect');
var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Item = new Schema({
    _id: ObjectId,
    id: Number,
    title: String,
    text: String,
    kids: Array,
    time: Number,
    type: String,
    score: Number,
    descendants: Number,
    by: String
});
connection.db.on('connected', function () {
    console.log('DB connection successful by Item Model');
});
module.exports.itemModel = connection.db.model('items', Item);

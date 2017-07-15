var connection = require('../connect');
var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Tags = new Schema({
    _id: ObjectId,
    id: Number,
    tag: Array
});
connection.db.on('connected', function () {
    console.log('DB connection successful by Tags Model');
});
module.exports.tagsModel = connection.db.model('tags', Tags);

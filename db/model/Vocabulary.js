var connection = require('../connect');
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Vocabulary = new Schema({
    _id: ObjectId,
    id: Number,
    title: String,
    vocabulary: [{
        word: String,
        freq: Number
    }]
});

connection.db.on('connected', function () {
    console.log('DB connection successful by Vocabulary Model');
});

module.exports.vocabularyModel = connection.db.model('vocabulary_all', Vocabulary, 'vocabulary_all');
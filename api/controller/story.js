var fs = require('fs');
var _ = require('underscore');
var async = require('async');

var Promise = require('promise');
var itemModel = require('../../db/model/Item');
var vocabularyModel = require('../../db/model/Vocabulary');
var tagsModel = require('../../db/model/Tags');

var storyPath = './data/top_stories_20170101';
var commentPath = './data/topComments';

var sendJsonResponse = function (res, status, content){
    res.status(status);
    res.json(content);
}

var getStoryById = function (res, item, docs, n) {
    var id = item.id;
    itemModel.itemModel.findOne({'id' : id},{ '_id' : 0}).lean().
        exec(function (err, doc) {
            if (err) {
                console.error(err)
            } else {
                doc.tag = item.tag;
                docs.push(doc);
                if (docs.length === n) {
                    sendJsonResponse(res, 200, docs);
                }
                    // if (docs.length === items.length) {
                    // sendJsonResponse(res, 200, docs);
                // }
            }
            
    })  
}

var processStories = function (samples, callback, res) {
    var resultArr = [];
    // var totalStories = tagsModel.tagsModel.count();
    for (var i = 0; i < samples; i++) {
        var skipRecords = _.random(2000);
        tagsModel.tagsModel.findOne().skip(skipRecords).exec(function(err, result) {
            if (err) {
                console.error(err);
            }
            // console.log(result);
            // getStoryById(res, result)
            // sendJsonResponse(res, 200, []);
            resultArr.push(result);
            if (resultArr.length === samples) {
                // console.log(resultArr);
                var docs = [];
                for (var i = 0; i < resultArr.length; i++) {
                    callback(res, resultArr[i], docs, resultArr.length)
                }
                
                // callback(res, resultArr);
            }
        })   
    }
}



module.exports.getRandomStories = function (req, res) {
    var resultArr = [];

    console.log('called getRandomStories API: ' + req.params.samples)

        // prevent no limit heap crash
        var samples = parseInt(req.params.samples);
        if (samples > 0) {
            // resultArr = getRandomStories(samples);
            processStories(samples, getStoryById, res);
        }
}

module.exports.getStoryTagById = function(req, res) {
    console.log('getStoryTagById: ' + req.params.id)
    if (req.params.id < 13200000) {
        tagsModel.tagsModel.find({'id' : req.params.id}).
            exec(function (err, doc) {
                sendJsonResponse(res, 200, doc[0])
            })
    }
    else {
        sendJsonResponse(res, 404, 'Story not available');
    }
}

module.exports.getStoryByTags = function(req, res) {
    var tags = req.params.tags.toString().replace('|', '/').split(',')
    console.log('getStoryByTags: ' + tags)
    tagsModel.tagsModel.find({'tag': {$all : tags}})
        .limit(20)
        .exec(function(err, docs) {
            var docArr = [];
            for (var i = 0; i < docs.length; i++) {
                getStoryById(res, docs[i], docArr, docs.length);
            }
        })
}

module.exports.getStoryDetails = function (req, res) {
    if (req.params.id < 13200000) {
        itemModel.itemModel.find({'id' : req.params.id}).
            exec(function (err, doc) {
                sendJsonResponse(res, 200, doc[0]);
        })
    }
    else {
        sendJsonResponse(res, 404, 'Story not available');
    }
}

module.exports.getStoryVocabulary = function (req, res) {
    console.log('Searching for id: ' + req.params.id);
    vocabularyModel.vocabularyModel.find({'id': req.params.id},).lean().
        exec(function (err, doc) {
            if (doc[0]) {
                sendJsonResponse(res, 200, doc[0])
            }
            else {
                sendJsonResponse(res, 200, -1)
            }

    });
}

module.exports.getTopComments = function (req, res) {
    var comments = [];
    itemModel.itemModel.findOne({'id' : req.params.id, 'deleted' : { '$exists' : false}}).
    exec(function (err, doc) {
        itemModel.itemModel.find({'id' : {'$in' : doc.kids}, 'deleted' : { '$exists' : false}}).
            exec(function (err, comments) {
            sendJsonResponse(res, 200, comments);
        });
    });
}

module.exports.getTopStories = function (req, res) {
    itemModel.itemModel.find({'type' : 'story', 'deleted' : { '$exists' : false}},{'score' : 1, 'title' : '1', 'id' : '1', 'descendants' : '1'})
    .lean()
    .sort({'score' : -1})
    .limit(parseInt(req.params.n))
    .exec(function (err, docs) {
        var tags = [];
        // console.log('docs length: ' + docs.length);
        for (var i = 0; i < docs.length; i++) {
            var query = {'id' : docs[i].id};
            tagsModel.tagsModel.findOne(query)
            .lean()
            .exec(function(err, doc) {
                if (err) {
                    console.log(docs[i].id)
                }
                if (doc && ('tag' in doc)) {
                    tags.push(doc.tag);
                    // console.log(i)
                    // console.log(docs[i])
                    // return;
                }
                else {
                    tags.push('N/A')
                }
                // console.log('tag length: ' + tags.length);
                if (tags.length === parseInt(req.params.n)) {
                    for (var j = 0; j < docs.length; j++) {
                        docs[j]['tag'] = tags[j];
                    }
                    sendJsonResponse(res, 200, docs);
                }
            })
            
        }
    });
}

module.exports.getNAsks = function (req, res) {
    itemModel.itemModel.find({'title': /Ask HN:/i, 'type': 'story', 'deleted' : { '$exists' : false}},{'score' : 1, 'title' : '1', 'id' : '1', 'descendants' : '1'})
        .lean()
        .sort({'score' : -1})
        .limit(parseInt(req.params.n))
        .exec(function (err, docs) {
            if (err) {
                console.error(err);
            }
            var tags = [];
            console.log('docs length: ' + docs.length);
            for (var i = 0; i < docs.length; i++) {
                var query = {'id' : docs[i].id};
                tagsModel.tagsModel.findOne(query)
                .lean()
                .exec(function(err, doc) {
                    if (err) {
                        console.log(docs[i].id)
                    }
                    if (doc && ('tag' in doc)) {
                        tags.push(doc.tag);
                        // console.log(i)
                        // console.log(docs[i])
                        // return;
                    }
                    else {
                        tags.push('N/A')
                    }
                    // console.log('tag length: ' + tags.length);
                    if (tags.length === parseInt(req.params.n)) {
                        for (var j = 0; j < docs.length; j++) {
                            docs[j]['tag'] = tags[j];
                        }
                        sendJsonResponse(res, 200, docs);
                    }
                })
            }
        })
        
}

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

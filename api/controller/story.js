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

var getStoryById = function (res, item, docs, n, noCommentFlag) {
    var id = item.id;
    var minComment = noCommentFlag === 'false' ? 0 : 1;
    itemModel.itemModel.findOne({'id' : id,
                                'descendants' : { '$gte' : minComment},
                                'deleted' : { '$exists' : false},
                                'dead': { '$exists' : false}},
                                { '_id' : 0}
                            )
        .lean()
        .exec(function (err, doc) {
            if (err) {
                console.error(err)
            } 
            else if (doc != null) {
                doc.tag = item.tag;
                docs.push(doc);
                if (docs.length === n) {
                    sendJsonResponse(res, 200, docs);
                }
                    // if (docs.length === items.length) {
                    // sendJsonResponse(res, 200, docs);
                // }
            }
            // handle no results
            else {
                docs.push({});
                if (docs.length === n) {
                    sendJsonResponse(res, 200, docs);
                }
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
    var skipRecords = _.random(500000);
    var tags = req.query.selectedCategories.toString().replace('|', '/').split(',')
    var resultLimit = req.query.displayNoComments === 'false' ? 20 : 40
    console.log('getStoryByTags: ' + tags)
    // tagsModel.tagsModel.find({'tag': {$all : tags}})
        // .limit(resultLimit)
    tagsModel.tagsModel.aggregate([{$match: { 'tag' : {$all : tags}}}, {$sample: { size: resultLimit}}], 
        function(err, docs) {
            var docArr = [];
            for (var i = 0; i < docs.length; i++) {
                getStoryById(res, docs[i], docArr, docs.length, req.query.displayNoComments);
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
    vocabularyModel.vocabularyModel.find({'id': req.params.id}).lean().
        exec(function (err, doc) {
            if (doc[0]) {
                sendJsonResponse(res, 200, doc[0])
            }
            else {
                sendJsonResponse(res, 200, -1)
            }

    });
}

module.exports.getStoriesByTitle = function (req, res) {
    console.log(req.params.query);
    var query = req.params.query.replace('|', '\\s');
    itemModel.itemModel.find({'title' : new RegExp(query, 'i'),
                                'descendants' : { '$gt' : 0},
                            },
                            {'score' : 1,
                            'title' : 1,
                            'id' : 1,
                            'descendants' : 1,
                            'deleted' : 1,
                            'dead': 1
                            })
    .maxTime(10000)
    .limit(20)
    .lean()
    .exec(function (err, docs) {
        sendJsonResponse(res, 200, docs);
    })
}

module.exports.getTopComments = function (req, res) {
    var comments = [];
    itemModel.itemModel.findOne({'id' : req.params.id, 
                                'deleted' : { '$exists' : false},
                                'dead': { '$exists' : false}
                                })
    .lean()
    .exec(function (err, doc) {
        console.log(doc);
        itemModel.itemModel.find({'id' : {'$in' : doc.kids},
                                'deleted' : { '$exists' : false}})
        .exec(function (err, comments) {
            sendJsonResponse(res, 200, comments);
        });
    });
}

module.exports.getTopStories = function (req, res) {
    itemModel.itemModel.find({'type' : 'story',
    'descendants' : { '$gt' : 0},
    'deleted' : { '$exists' : false},
    'dead' : { '$exists' : false}},
    {'score' : 1, 'title' : '1', 'id' : '1', 'descendants' : '1'})
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
    itemModel.itemModel.find({'title': /Ask HN:/i,
    'type': 'story',
    'descendants' : { '$gt' : 0},
    'deleted' : { '$exists' : false}},
    {'score' : 1, 'title' : '1', 'id' : '1', 'descendants' : '1'})
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

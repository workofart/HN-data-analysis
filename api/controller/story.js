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



// module.exports.getTopStories = function (req, res) {
//     var objArr = [];
//
//     // var readStories =
//     var files = fs.readdirSync(storyPath);
//     files.forEach(file => {
//         // console.log(file);
//         data = fs.readFileSync(storyPath + "/" + file, 'utf8')
//         temp = JSON.parse(data);
//         obj = {
//             'descendants' : temp.descendants,
//             'score' : temp.score,
//             'id' : temp.id,
//             'title' : temp.title
//         }
//         objArr.push(obj);
//     });
//     sendJsonResponse(res, 200, objArr);
// }


module.exports.getRandomStories = function (req, res) {
    var arr = [];
    console.log('called getRandomStories API: ' + req.params.samples)

        // prevent no limit heap crash
        if (parseInt(req.params.samples) > 0) {
            tagsModel.tagsModel.find().lean().limit(parseInt(req.params.samples)).exec(
            function (err, result) {
                if (err) {
                    console.error(err);
                }
                console.log(result);
                var arrTag = result.map(function(item) {
                    return item.tag
                })
                for (var i in result) {
                    var tag = result[i].tag;
                    // console.log(tag);
                    itemModel.itemModel.findOne({'id' : result[i].id},{ '_id' : 0}).lean().
                        exec(function (err, doc) {
                            if (err) {
                                console.error(err)
                            } else {
                                arr.push(doc);
                                // console.log(arr);
                                if (arr.length === parseInt(req.params.samples)) {
                                    for (var i in arr) {
                                        arr[i].tag = arrTag[i];
                                    }
                                    // console.log(arr);
                                    console.log('sent back response')
                                    sendJsonResponse(res, 200, arr);
                                }
                            }
                            
                    })
                }
            });
        }
}

module.exports.getStoryDetails = function (req, res) {
    itemModel.itemModel.find({'id' : req.params.id}).
        exec(function (err, doc) {
            sendJsonResponse(res, 200, doc[0]);
    })

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
    itemModel.itemModel.findOne({'id' : req.params.id}).
    exec(function (err, doc) {
        itemModel.itemModel.find({'id' : {'$in' : doc.kids}}).
            exec(function (err, comments) {
            sendJsonResponse(res, 200, comments);
        });
    });
}

module.exports.getTopStories = function (req, res) {
    itemModel.itemModel.find({'type' : 'story'},{'score' : 1, 'title' : '1', 'id' : '1', 'descendants' : '1'}).
    sort({'score' : -1}).
    limit(100).
    exec(function (err, docs) {
        sendJsonResponse(res, 200, docs);
    });

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

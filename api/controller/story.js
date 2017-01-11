var fs = require('fs');
var _ = require('underscore');
var Promise = require('promise');

var storyPath = './data/top_stories_20170101';
var commentPath = './data/topComments';

var sendJsonResponse = function (res, status, content){
    res.status(status);
    res.json(content);
}



module.exports.getTopStories = function (req, res) {
    var objArr = [];

    // var readStories =
    var files = fs.readdirSync(storyPath);
    files.forEach(file => {
        // console.log(file);
        data = fs.readFileSync(storyPath + "/" + file, 'utf8')
        temp = JSON.parse(data);
        obj = {
            'descendants' : temp.descendants,
            'score' : temp.score,
            'id' : temp.id,
            'title' : temp.title
        }
        objArr.push(obj);
    });
    sendJsonResponse(res, 200, objArr);
}


module.exports.getStoryDetails = function (req, res) {
    var objArr = [];

    // var readStories =
    var files = fs.readdirSync(storyPath);
    var targetFile = _.find(files, function (file) {
        // console.log(req.params.id + 'vs  ' + file.substr(0, file.length-5));
        if (file.substr(0, file.length-5) == req.params.id){
            return file;
        }

    });
    data = fs.readFileSync(storyPath + "/" + targetFile, 'utf8');
    obj = JSON.parse(data);
    sendJsonResponse(res, 200, obj);
}

module.exports.getTopComments = function (req, res) {
    var files = fs.readdirSync(commentPath);
    var targetFile = _.find(files, function (file) {
        if (file.substr(0, file.length-5) == req.params.id){
            return file;
        }
    });
    data = fs.readFileSync(commentPath + "/" + targetFile, 'utf8');
    obj = JSON.parse(data);
    sendJsonResponse(res, 200, obj);
}
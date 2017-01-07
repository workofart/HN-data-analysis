var fs = require('fs');
var _ = require('underscore');
var Promise = require('promise');

// var dataPath = '../../data/top_stories_20170101';
var dataPath = './data/top_stories_20170101';

var sendJsonResponse = function (res, status, content){
    res.status(status);
    res.json(content);
}



module.exports.getTopStories = function (req, res) {
    var objArr = [];

    // var readStories =
    var files = fs.readdirSync(dataPath);
    files.forEach(file => {
        // console.log(file);
        data = fs.readFileSync(dataPath + "/" + file, 'utf8')
        obj = JSON.parse(data);
        objArr.push(obj);
    });
    sendJsonResponse(res, 200, objArr);
}


module.exports.getTopStories = function (req, res) {
    var objArr = [];

    // var readStories =
    var files = fs.readdirSync(dataPath);
    files.forEach(file => {
        // console.log(file);
        data = fs.readFileSync(dataPath + "/" + file, 'utf8')
        obj = JSON.parse(data);
        objArr.push(obj);
    });
    sendJsonResponse(res, 200, objArr);
}
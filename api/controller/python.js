/**
 * This file contains all the API used for calling certain python functions
 */


const zerorpc = require('zerorpc');
const client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:4242');
console.log('----------- ZeroRPC [Node.js] Successfully started ----------')

var sendJsonResponse = function (res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.getLatestStories = function(req, res) {
    client.invoke('runner', 'py_rpc', function(err, result) {
        if (err) {console.log(err)};
        console.log(result)
        sendJsonResponse(res, 200, result);
        
    })
}

/**
 * Spawning child process version
 */
// const PyShell = require('python-shell')
// const options =  {
//     pythonPath: 'D:/Program Files/Anaconda3/envs/py-35/python',
//     scriptPath: __dirname
// }

//  module.exports.getLatestStories = function (req, res) {
//     PyShell.run('py_db.py', options, function(err, results) {
//         if (err) console.error(err);
//         console.log(results)
//     })
// }
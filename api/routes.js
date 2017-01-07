const express = require('express');
var router = express.Router();

var story_controller = require('./controller/story');

router.get('/getTopStories', story_controller.getTopStories);


module.exports = router;
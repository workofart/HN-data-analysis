const express = require('express');
var router = express.Router();

var story_controller = require('./controller/story');
var ask_controller = require('./controller/ask');

router.get('/getTopStories', story_controller.getTopStories);
router.get('/getRandomStories/:samples', story_controller.getRandomStories);
router.get('/getStoryDetails/:id', story_controller.getStoryDetails);
router.get('/getStoryVocabulary/:id', story_controller.getStoryVocabulary);
router.get('/getTopComments/:id', story_controller.getTopComments);

router.get('/getTopAsks', ask_controller.getTopAsks);
router.get('/getAskDetails/:id', ask_controller.getAskDetails);

module.exports = router;
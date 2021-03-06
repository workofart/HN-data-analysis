const express = require('express');
var router = express.Router();

var story_controller = require('./controller/story');
var ask_controller = require('./controller/ask');
var python_controller = require('./controller/python');

router.get('/getTopStories/:n', story_controller.getTopStories);
router.get('/getRandomStories/:samples', story_controller.getRandomStories);
router.get('/getStoryTagById/:id', story_controller.getStoryTagById);
router.get('/getStoryDetails/:id', story_controller.getStoryDetails);
router.get('/getStoryVocabulary/:id', story_controller.getStoryVocabulary);
router.get('/getTopComments/:id', story_controller.getTopComments);
router.get('/getNAsks/:n', story_controller.getNAsks);
router.get('/getStoryByTags', story_controller.getStoryByTags);
router.get('/getStoriesByTitle/:query', story_controller.getStoriesByTitle);


router.get('/getTopAsks', ask_controller.getTopAsks);
router.get('/getAskDetails/:id', ask_controller.getAskDetails);


// Python API
router.get('/py/getLatestStories', python_controller.getLatestStories);

module.exports = router;
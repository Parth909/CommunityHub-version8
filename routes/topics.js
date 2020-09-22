// different route for topics is required for things like
//creating,editing,deleting and doing other things solely on topics
const express = require('express');
const Topic = require('../models/topic');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { 
	asyncErrorHandler, 
	isLoggedIn,
	isTopicAuthor 
} = require('../helpers');

const { 
	isTopicCreator
} = require('../helpers/topics.js');

const { 
	topicIndex,
	topicCatAll,
	topicNew,
	topicCreate,
	topicShow,
	topicEdit,
	topicUpdate,
	topicDestroy
} = require('../controllers/topics');

/* GET topics index /topics/ */ //For showing all topics
router.get('/', isLoggedIn, asyncErrorHandler(topicIndex));

/* GET topics index /topics/new */ //Page for creating new topic
router.get('/new', isLoggedIn, topicNew);

/* POST topics create /topics/ */ //For saving the topic
router.post('/', isLoggedIn, upload.array('topicImage', 4), asyncErrorHandler(topicCreate));

/* GET topics show /topics/:id */ //This route is reserved for the one who owns the topic
//This route can be further used for adding admin privileges / managing channel
router.get('/:id', isLoggedIn, asyncErrorHandler(isTopicCreator) ,asyncErrorHandler(topicShow));

/* GET topics edit /posts/:id/edit *///there is going to be only one topic image 
//the back images will be provided by us (so that user  doesn't mess up the look)
router.get('/:id/edit', isLoggedIn, asyncErrorHandler(isTopicAuthor), topicEdit);

/* PUT posts update /posts/:id */
router.put('/:id', isLoggedIn, asyncErrorHandler(isTopicAuthor), upload.array('topicImage', 1), asyncErrorHandler(topicUpdate));

/* DELETE posts destroy /posts/:id */
router.delete('/:id', isLoggedIn, asyncErrorHandler(isTopicAuthor), asyncErrorHandler(topicDestroy));

/* GET topics for One Category /topics/:acteg_id */
router.get('/allcattopics/:cat_id', isLoggedIn, asyncErrorHandler(topicCatAll));
module.exports = router;
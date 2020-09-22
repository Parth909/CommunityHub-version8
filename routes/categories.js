const express = require('express');
const router = express.Router({ mergeParams: true });

const {
	newCat,
	catPost
} = require('../controllers/categories')

const { 
    asyncErrorHandler, 
    isLoggedIn
} = require('../helpers');

/*GET /categories/new */
router.get('/new', isLoggedIn, newCat);

router.post('/', isLoggedIn, asyncErrorHandler(catPost));

module.exports = router;
var express = require('express');
var router = express.Router();
var Users = require('../Library/User');


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('Tutors/Password', { title: 'Web Authoring' });

});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
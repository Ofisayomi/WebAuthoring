var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Tutors/Message', { title: 'Web Authoring' });
});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
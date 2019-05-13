var express = require('express');
var router = express.Router();
const Users = require('../Library/User');


/* GET home page. */
router.get('/', function(req, res, next) {
    var User = new Users();
    User.GetDetails(req.user.username).then((data) => {
        res.render('Admin/Profile', { title: 'Web Authoring', Data: data });
    }).catch((errmessage) => {
        res.redirect('./index');
    });
});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
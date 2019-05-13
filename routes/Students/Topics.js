var express = require('express');
var router = express.Router();
var Users = require('../Library/User');


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        var User = new Users();
        User.GetDetails(req.user.username).then((data) => {
            res.render('Students/Topics', { title: 'OnVAc', Data: data });
        }).catch((errmessage) => {
            console.log(errmessage);
            res.redirect('index');
        });
    } catch (Ex) {
        console.log(Ex);
        res.redirect('index');
    }
});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
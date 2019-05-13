var express = require('express');
var router = express.Router();
var Users = require('../Library/User');
var Acts = require('../Library/Acts');


/* GET home page. */
router.get('/', function(req, res, next) {

    try {
        var User = new Users();

        var sub = req.query.sub;
        User.GetContentTopics(sub).then((Topics) => {

            User.GetDetails(req.user.username).then((data) => {
                User.GetSubject().then((subjects) => {
                        res.render('Tutors/Content', { title: 'Web Authoring', Data: data, Topics: Topics, Subjects: subjects });
                    })
                    //     console.log(JSON.stringify(Topics));

            })
        }).catch((errmessage) => {
            console.log(errmessage);
            res.redirect('./');
        });
    } catch (Ex) {
        console.log(Ex);
        res.redirect('./');
    }
});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
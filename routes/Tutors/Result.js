var express = require('express');
var router = express.Router();
var Users = require('../Library/User');
var validator = require('validator');


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        var User = new Users();
        //    var Id = req.query.note;
        //    var topic = req.query.topic;
        User.GetDetails(req.user.username).then((data) => {

            User.ExamResults().then((Results) => {

                User.GetSubject().then((subjects) => {
                    res.render('Tutors/Result', {
                        title: 'Web Authoring',
                        Data: data,
                        Subjects: subjects,
                        Result: Results,
                        Status: false,
                        Username: req.user.username
                    });
                });
            });
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
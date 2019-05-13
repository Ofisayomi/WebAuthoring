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
        var status = false;
        User.GetDetails(req.user.username).then((data) => {
            User.CheckRole(req.user.username).then((Role) => {
                if (Role == 'Student') {
                    status = true;
                }
                User.ExamResults().then((Results) => {
                    console.log(Results);
                    User.GetSubject().then((subjects) => {
                        res.render('Tutors/Result', { title: 'Web Authoring', Data: data, Subjects: subjects, Result: Results, Status: status, Username: req.user.username });
                    });
                })
            })

        }).catch((errmessage) => {
            console.log(errmessage);
            res.redirect('Students/#!Profile');
        });
    } catch (Ex) {
        console.log(Ex);
        res.redirect('Students/#!Profile');
    }
});

router.post('/signin', function(req, res) {

});

router.post('/register', function(req, res) {

});

module.exports = router;
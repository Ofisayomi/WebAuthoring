var express = require('express');
var router = express.Router();
var Users = require('../Library/User');


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        var User = new Users();
        console.log(req.query.sub);
        var subject = req.query.sub;
        User.GetDetails(req.user.username).then((Userdata) => {
                User.GetSubject().then((subjects) => {
                    User.GetTopic(subject).then((data) => {
                        console.log('Subject: ' + JSON.stringify(subject));
                        console.log('Topics: ' + JSON.stringify(data));
                        res.render('Students/ListTopics', { title: 'OnVAc', Data: Userdata, Topic: data, Subjects: subjects });
                    }).catch((errmessage) => {
                        console.log(errmessage);
                        res.redirect('index');
                    });
                }).catch((errmessage) => {
                    console.log(errmessage);
                    res.redirect('index');
                });
            })
            .catch((errmessage) => {
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
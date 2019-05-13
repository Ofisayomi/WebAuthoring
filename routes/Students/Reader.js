var express = require('express');
var router = express.Router();
var Users = require('../Library/User');
var validator = require('validator');


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        var User = new Users();
        var Id = req.query.note;
        var topic = req.query.topic;
        User.GetDetails(req.user.username).then((data) => {
            User.GetContentById(Id).then((content) => {
                User.GetSubject().then((subjects) => {
                    var conty = validator.unescape(content[0].Content);
                    res.render('Students/Reader', { title: 'OnVAc', Data: data, content: conty, Subjects: subjects, Topic: topic, Id: Id, Type: content[0].File });
                })

            })

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
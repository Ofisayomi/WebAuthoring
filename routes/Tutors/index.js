var express = require('express');
var router = express.Router();
var Users = require('../Library/User');


/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        var User = new Users();
        User.GetDetails(req.user.username).then((data) => {
            User.GetSubject().then((subjects) => {
                res.render('Tutors/index', { title: 'Web Authoring', Data: data, Subjects: subjects });
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

module.exports = router;
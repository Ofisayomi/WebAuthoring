var LocalStrategy = require('passport-local');
var passport = require('passport');
var User = require('./Library/User');
var express = require('express');
var validator = require('validator');
var nodemailer = require('nodemailer');

var router = express.Router();
var usertype = "";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Web Authoring', message: '', color: 'black' });
});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        var cc = new User();
        cc.Login(username, password).then((data) => {
            var UsertypeId = data[0].RoleId;

            if (UsertypeId == 1) {
                usertype = "/Tutor";
            } else if (UsertypeId == 2) {
                usertype = "/Students";
            } else if (UsertypeId == 3) {
                usertype = "/Admin";
            } else {
                usertype = "/";
            }
            return done(null, data[0]);
        }).catch((errmessage) => {
            console.log(errmessage);
            return done(null, false);
        });

    }));

router.post('/signin', passport.authenticate('local', {

    failureRedirect: '/',
    failureFlash: true
}), function(req, res) {

    res.redirect(usertype);
});

router.post('/register', function(req, res) {

    var user = new User();
    user.CheckEmail(req.body.txtEmail).then((status) => {

        if (status == true) {

            res.render('index', { message: '* Supplied email in existence', color: 'red' });
        } else if (validator.isEmail(req.body.txtEmail) == false) {

            res.render('index', { message: '* Invalid email address', color: 'red' });
        } else if (!validator.equals(req.body.txtPassword, req.body.txtConfirmPassword)) {

            res.render('index', { message: '* Password confirmation failed', color: 'red' });
        } else if (validator.isLength(req.body.txtPassword, { min: 5, max: 15 }) == false) {

            res.render('index', { message: '* Password length must not be less than 5', color: 'red' });
        } else if (validator.isAlpha(req.body.txtFirstname) == false) {

            res.render('index', { message: '* Invalid Firstname supplied', color: 'red' });
        } else if (validator.isAlpha(req.body.txtSurname) == false) {
            res.render('index', { message: '* Invalid Surname supplied', color: 'red' });
        } else if (validator.equals(req.body.drpGender, 'Select Gender')) {
            res.render('index', { message: '* Invalid Gender selected', color: 'red' });
        } else if (!validator.isNumeric(req.body.txtPhone)) {
            res.render('index', { message: '* Invalid Phone Number supplied', color: 'red' });
        } else {
            var Email = validator.escape(req.body.txtEmail);
            var Password = validator.escape(req.body.txtPassword);
            var Firstname = validator.escape(req.body.txtFirstname);
            var Surname = validator.escape(req.body.txtSurname);
            var Othernames = validator.escape(req.body.txtOthernames);
            var Gender = validator.escape(req.body.drpGender);
            var Phone = validator.escape(req.body.txtPhone);

            user.Create(Email, Password, Email, Firstname, Surname, Othernames, Gender, Phone, 'Student').then((data) => {

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'authoringweb2018@gmail.com',
                        pass: 'jesuschrist2018'
                    }
                });

                var mailOptions = {
                    from: 'authoringweb2018@gmail.com',
                    to: Email + ',' + 'owolofisayo@hotmail.com',
                    subject: 'Web Authoring Notification',
                    text: 'Your registration at the web authoring was successful /n Username: ' + req.body.txtEmail + ' Password: ' + req.body.txtPassword
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.render('index', { message: 'Your login details has been sent to the supplied email address, Login to your email to confirm...', color: 'green' });
            }).catch((errmessage) => {

                res.render('index', { message: errmessage['sqlMessage'], color: 'red' });
            });
        }
    }).catch((errmessage) => {
        res.render('index', { message: 'An error occurred' });
    });

});

module.exports = router;
var express = require('express');
var router = express.Router();
var Users = require('../Library/User');
var validator = require('validator');


/* GET home page. */
router.get('/', function(req, res, next) {

    try {
        var User = new Users();
        User.GetDetails(req.user.username).then((data) => {
            res.render('Admin/AddUser', { Data: data, message: '', color: 'black' });
        }).catch((errmessage) => {
            console.log('Get Err: ' + errmessage);
            res.redirect('./index');
        })
    } catch (error) {
        console.log(error);
    }
});

router.post('/', function(req, res) {

    try {
        var user = new Users();
        user.CheckEmail(req.body.txtEmail).then((status) => {

            if (status == true) {

                res.render('Admin/AddUser', { message: '* Supplied email in existence', color: 'red' });
            } else if (validator.isEmail(req.body.txtEmail) == false) {

                res.render('Admin/AddUser', { message: '* Invalid email address', color: 'red' });
            } else if (!validator.equals(req.body.txtPassword, req.body.txtConfirmPassword)) {

                res.render('Admin/AddUser', { message: '* Password confirmation failed', color: 'red' });
            } else if (validator.isLength(req.body.txtPassword, { min: 5, max: 15 }) == false) {

                res.render('Admin/AddUser', { message: '* Password length must not be less than 5', color: 'red' });
            } else if (validator.isAlpha(req.body.txtFirstname) == false) {

                res.render('Admin/AddUser', { message: '* Invalid Firstname supplied', color: 'red' });
            } else if (validator.isAlpha(req.body.txtSurname) == false) {

                res.render('Admin/AddUser', { message: '* Invalid Surname supplied', color: 'red' });
            } else if (validator.equals(req.body.drpGender, 'Select Gender')) {

                res.render('Admin/AddUser', { message: '* Invalid Gender selected', color: 'red' });
            } else if (validator.equals(req.body.drpRole, 'Select Role')) {

                res.render('Admin/AddUser', { message: '* Invalid Role selected', color: 'red' });
            } else if (!validator.isNumeric(req.body.txtPhone)) {

                res.render('Admin/AddUser', { message: '* Invalid Phone Number supplied', color: 'red' });
            } else {
                user.GetRole(validator.escape(req.body.drpRole)).then((RoleId) => {
                    console.log('RoleId is: ' + RoleId);
                    user.Create(validator.escape(req.body.txtEmail), validator.escape(req.body.txtPassword), validator.escape(req.body.txtEmail), validator.escape(req.body.txtFirstname), validator.escape(req.body.txtSurname), validator.escape(req.body.txtOthernames), validator.escape(req.body.drpGender), validator.escape(req.body.txtPhone), RoleId).then((data) => {
                        res.render('Admin/AddUser', {
                            message: 'New User successfully created. A confirmation link has been sent to the User email',
                            color: 'green'
                        });
                    }).catch((errmessage) => {

                        res.render('Admin/AddUser', { message: errmessage['sqlMessage'], color: 'red' });
                    });
                }).catch((errmessage) => {
                    res.render('Admin/AddUser', { message: errmessage['sqlMessage'], color: 'red' });
                });
            }
        }).catch((errmessage) => {
            console.log('Anoda Error: ' + errmessage);
            res.render('Admin/AddUser', { message: errmessage });
        });
    } catch (err) {
        console.log(err);
        res.redirect('Admin');
    }
});

module.exports = router;
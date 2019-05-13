var mysql = require('mysql');
var User = require('./User.js');
var validator = require('validator');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Oluwfisay@12",
    database: "OnVac"
});


module.exports = class Students {

    CreateTop(req, res) {


        var usek = new User();
        usek.CheckEmail(validator.escape(req.body.email)).then((status) => {
            var phoneNo = req.body.txtPhone;

            if (status == true) {

                res.send('* Supplied email in existence');
            } else if (validator.isEmail(req.body.email) == false) {

                res.send('* Invalid email address');
            } else if (!validator.equals(req.body.password, req.body.confirmpassword)) {

                res.send('* Password confirmation failed');
            } else if (validator.isLength(req.body.password, { min: 5, max: 15 }) == false) {

                res.send('* Password length must not be less than 5');
            } else if (validator.isAlpha(req.body.firstname) == false) {

                res.send('* Invalid Firstname supplied');
            } else if (validator.isAlpha(req.body.lastname) == false) {

                res.send('* Invalid Surname supplied');
            } else if (validator.equals(req.body.drpGender, 'Select Gender')) {

                res.send('* Invalid Gender selected');
            } else if (validator.equals(req.body.drpRole, 'Select Role')) {

                res.send('* Invalid Role selected');
            } else if (validator.isNumeric(phoneNo.toString()) == false) {

                res.send('* Invalid Phone Number supplied');
            } else {

                var email = validator.escape(req.body.email);
                var password = validator.escape(req.body.password)
                var firstname = validator.escape(req.body.firstname)
                var lastname = validator.escape(req.body.lastname);
                var othername = validator.escape(req.body.othername);
                var gender = validator.escape(req.body.drpGender);
                var phone = validator.escape(req.body.txtPhone.toString());
                var role = validator.escape(req.body.drpRole);
                usek.Create(email, password, email, firstname, lastname, othername, gender, phone, role).then((data) => {

                    res.send('* Confirmation email sent to User email address supplied');
                }, (errmessage) => {
                    console.log(errmessage);
                    res.send('* Invalid Data supplied');
                })
            }
        }).catch((Err) => {
            console.log(Err);
            res.send('* Invalid Data supplied');
        });
    }


    UserStatus(req, res) {

    }

};
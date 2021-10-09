var mysql = require('mysql');
var validator = require('validator');
var User = require('./User');
var fs = require('fs');
var path = require('path');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Oluwfisay@12",
    database: "OnVAc"
});

module.exports = class Actions {

    CreateTopic(req, res) {
        var Description = validator.escape(req.body.description);
        var ObjIntro = validator.escape(req.body.objintro);
        var Course = validator.escape(req.body.course);
        return new Promise((resolve, reject) => {
            connection.query('insert into Topic(Description, ObjIntro, CourseId) select ?, ?, Id from Course where Course.Description=?', [Description, ObjIntro, Course], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }).then((data) => {
            console.log(data);
            res.send('* New Topic Creation Successful...');
        }, (err) => {
            console.log(err);
            res.send('* New topic Creation failed...');
        })
    }

    CreateCourse(req, res) {
        var username = validator.escape(req.user.username.toLowerCase());
        var code = validator.escape(req.body.code.toLowerCase());
        var description = validator.escape(req.body.description.toLowerCase());
        var Usek = new User();

        Usek.CheckCode(code).then((data) => {
            //         console.log('Data is: ' + data);
            if (data == true) {
                connection.query('insert into subjects(Descr, Code) values (?, ?)', [description, code]);
                connection.query('insert into Course(Description, DateCreated, UserId, Code) select ?, ?, User.Id, ? from User where User.username=?', [description, new Date().toLocaleDateString(), code, username], function(err, rows) {
                    if (err) {
                        console.log(err);
                        res.send('* New Course Creation failed');
                    } else {
                        res.send('* New Course Created Successfully');
                    }
                });
            } else {
                res.send('* Supplied Subject Code in existence');
            }
        }).catch((err) => {
            console.log(err);
            res.send('* New Course Code Supplied in existence');
        })
    }

    GetTopic(req, res) {
        //    console.log('Body: ' + JSON.stringify(req.body));
        var subject = validator.escape(req.body.subject);
        return new Promise((resolve, reject) => {
            connection.query('select Topic.Description from Topic join Course on Topic.CourseId=Course.Id where Course.Description=?', [subject], function(err, rows) {
                if (err) {

                    reject(err)
                } else {
                    resolve(rows);
                }
            })
        }).then((data) => {
            res.send(data);
        }, (err) => {
            res.send(err);
        })
    }

    CreateObj(req, res) {

        var subject = req.body.subject;
        var topic = req.body.topic;
        var obj = req.body.obj;

        return new Promise((resolve, reject) => {
            connection.query('insert into Objectives(Description, TopicId) select ?,Topic.Id from Topic join Course on Course.Id=Topic.CourseId where Topic.Description=? and Course.Description=?', [obj, topic, subject], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve('* New topic objective successfully added');
                }
            })
        }).then((data) => {
            console.log(data);
            res.send('* New Topic Objective successfully added');
        }).catch((err) => {
            console.log(err);
            res.send('* New Objective process failed');
        })
    }

    CreateQuestion(req, res) {
        var question = req.body.question;

        console.log("Create Question body: " + JSON.stringify(req.body));

        var Subject = req.body.subject;

        var option1 = req.body.OptionA;
        var IsAnswerA = req.body.IsAnswerA || 0;

        var option2 = req.body.OptionB;
        var IsAnswerB = req.body.IsAnswerB || 0;

        var option3 = req.body.OptionC;
        var IsAnswerC = req.body.IsAnswerC || 0;

        var option4 = req.body.OptionD;
        var IsAnswerD = req.body.IsAnswerD || 0;

        //  console.log('Answers: ' + IsAnswerA + IsAnswerB + IsAnswerC + IsAnswerD);
        return new Promise((resolve, reject) => {

                connection.query('insert into questions(Descr, SubjectId) select ?, subjects.Id from subjects where subjects.Descr=?', [question, Subject], function(err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        connection.query('insert into options(Descr, QuestionId, IsAnswer) values(?, ?, ?)', [option1, rows.insertId, IsAnswerA], function(err1, rows1) {
                            if (err1) {
                                reject("Error 1: " + JSON.stringify(err1));
                            } else {
                                console.log(JSON.stringify(rows1));
                            }
                        })

                        connection.query('insert into options(Descr, QuestionId, IsAnswer) values(?, ?, ?)', [option2, rows.insertId, IsAnswerB], function(err2, rows2) {
                            //   console.log('Err: ' + err2 || rows2);
                            if (err2) {
                                reject("Error 2: " + JSON.stringify(err2));
                            } else {
                                console.log(JSON.stringify(rows2));
                            }
                        })

                        connection.query('insert into options(Descr, QuestionId, IsAnswer) values(?, ?, ?)', [option3, rows.insertId, IsAnswerC], function(err3, rows3) {
                            if (err3) {
                                reject("Error 3: " + JSON.stringify(err3));
                            } else {
                                console.log(JSON.stringify(rows3));
                            }
                        })
                        connection.query('insert into options(Descr, QuestionId, IsAnswer) values(?, ?, ?)', [option4, rows.insertId, IsAnswerD], function(err4, rows4) {
                            if (err4) {
                                reject("Error 4: " + JSON.stringify(err4));
                            } else {
                                console.log(JSON.stringify(rows4));
                            }
                        })
                        resolve('* Question Successfully added...');
                    }
                });
            })
            .then((message) => {
                console.log('Message: ' + message);
                res.send('* Question Successfully added...');
            })
            .catch((err) => {
                console.log('Error: ' + err);
            })

    }

    CreateContent(req, res) {
        return new Promise((resolve, reject) => {

            var Topic = validator.escape(req.body.topic);
            var subject = validator.escape(req.body.course);
            var content = validator.escape(req.body.cont);
            var username = req.user.username;
            var extention = path.extname(req.body.filename);
            //       connection.query('insert into Content(TopicId, Content, UserId, Date) select Topic.Id, ?, User.Id, ? from Topic join Course on Topic.CourseId=Course.Id join User where Course.Description=? and Topic.Description=? and User.Username=?', [content, new Date().toLocaleDateString(), subject, Topic, username],
            connection.query('select Topic.Id from Topic join Course on Course.Id = Topic.CourseId where Topic.Description=? and Course.Id=?', [Topic, subject], function(errTopic, rowTopic) {
                connection.query('select User.Id from User where User.Username=?', [username], function(errUser, rowUser) {
                    connection.query('insert into Content(TopicId, Content, UserId, File, Date) values (?, ?, ?, ?, Now())', [rowTopic[0].Id, content, rowUser[0].Id, extention],
                        function(err, rows) {
                            if (err) {
                                reject(err)
                            } else {
                                console.log(rows);
                                resolve(rows);
                            }
                        });
                })
            });
        }).then((rows) => {
            //     console.log(typeof(req.body.filecontent));

            fs.writeFile('./public/files/' + rows.insertId + path.extname(req.body.filename), new Buffer(req.body.filecontent, 'base64'), function(err) {
                if (err) {
                    console.log(err);
                } else {

                }
            });
            res.send('* Topic Content Uploaded Successfully...');
        });
    }

    GetExamTime(req, res) {
        res.send({ descr: 10 });
    }

    UpdatePic(req, res) {
        var username = req.user.username;
        console.log(req.body.filename);
        return new Promise((resolve, reject) => {
            connection.query('select Id from User where email=?', [username], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        }).then((info) => {
            console.log('UserId: ' + JSON.stringify(info[0].Id));

            fs.writeFile('./public/Users/' + info[0].Id + path.extname(req.body.filename), new Buffer(req.body.filecontent, 'base64'), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    connection.query('update User set User.Picture=? where User.email=?', ['/Users/' + info[0].Id + path.extname(req.body.filename), username], function(er, row) {
                        if (er) {
                            console.log(er);
                        } else {
                            res.send('done');
                        }
                    })

                }

            });
        }).catch((err) => {
            console.log(err);
            res.send('done');
        })

    }

    UpdatePassword(req, res) {
        var old = req.body.old;
        var newpass = req.body.new;
        var username = req.user.username;
        var confirm = req.body.confirm;

        connection.query('select Password from User where username=?', [username], function(err, rows) {
            if (err) {
                res.send('* failed');
            } else if (rows[0].Password == old) {
                if (newpass == confirm) {
                    if (validator.isLength(newpass, { min: 5, max: 15 })) {
                        connection.query('update User set Password=? where email=?', [newpass, username], function(er, row) {
                            if (er) {
                                res.send('* failed');
                            } else {
                                res.send('* Password update successful');
                            }
                        })
                    } else {
                        res.send('* Password should be minimum of 5, maximum of 15 characters');
                    }
                } else {
                    res.send('* Password confirmation failed');
                }
            } else {
                console.log(JSON.stringify(rows));
                res.send('* Invalid old password supplied');
            }
        });

    }

    UpdateProfile(req, res) {
        var username = req.user.username;
        var data = req.body.data;
        var status = req.body.status;
        console.log(data + ' || ' + status);
        var query = "";
        if (data == "") {
            res.send('');
        } else {
            if (status == 1) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.FirstName=? where User.email=?";
            } else if (status == 2) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.LastName=? where User.email=?";
            } else if (status == 3) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.OtherName=? where User.email=?";
            } else if (status == 4) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.PhoneNumber=? where User.email=?";
            } else if (status == 5) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.Gender=? where User.email=?";
            } else if (status == 6) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.DOB=? where User.email=?";
            } else if (status == 7) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.City=? where User.email=?";
            } else if (status == 8) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.State=? where User.email=?";
            } else if (status == 9) {
                query = "update Biodata join User on User.Id=Biodata.UserId set Biodata.Country=? where User.email=?";
            }


            return new Promise((resolve, reject) => {
                connection.query(query, [data, username], function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject('error');
                    } else {
                        resolve('success');
                    }
                })
            }).then((message) => {
                res.send(message);
            }).catch((err) => {
                res.send(err);
            });
        }
    }

    ExamResults(req, res) {

        var cc = [];
        var count = 0;
        var status = false;
        return new Promise((resolve, reject) => {
            connection.query('select count(distinct examquestions.ExamDoneId) as Length from examquestions', (CountErr, CountData) => {
                var query = connection.query('select examdones.Id as Id, subjects.Descr as Subject, count(examquestions.QuestionId) as Counts, students.`Names` as Name from examquestions join examdones on examdones.Id=examquestions.ExamDoneId join students on students.Id=examdones.StudentId join subjects on subjects.Id=examdones.SubjectId group by examquestions.ExamDoneId');
                query.on('result', (data) => {

                    connection.query('select count(examquestions.OptionId) as Counts from examquestions join options on options.Id=examquestions.OptionId where examquestions.ExamDoneId=? and options.IsAnswer=1', [data.Id], (err, rows) => {
                        //          drudge(data.Name, data.Subject, data.Counts, rows[0].Counts, status, CountData[0].Length);
                        //       console.log(data.Id);
                        count++
                        if (count == CountData[0].Length) {
                            resolve({ Name: data.Name, Subject: data.Subject, Count: rows[0].Counts })
                        }
                    });

                });
            });

        }).then((data) => {
            res.send(data);
        });
    }

    Submit(req, res) {

        var data = req.body;
        //      console.log('Data [0]: ' + data.data[0]);
        for (var cc = 0; cc < data['length']; cc++) {
            var doneId = data['done'];

            var questId = data.data[cc][0];
            var opti = data.data[cc][1];
            if (opti == '') {
                opti = 0;
            }

            connection.query('insert into examquestions(ExamdoneId, QuestionId, OptionId) values(?, ?, ?)', [doneId, questId, opti], function(err, rows) {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.send("Submission Successful");
    }

    GetAns(req, res) {

        var questNo = req.body.QuestNo;
        //  console.log(questNo);
        var data = "<ScriptAnswers>";
        for (var count = 0; count < questNo; count++) {
            data += '<ScriptAnswer><Question></Question><option></option></ScriptAnswer>';
        }
        res.end(data + "</ScriptAnswers>");

    }

    ReadTests(req, res) {
        console.log(req.body);
        var cunt = 0;
        var questionss = [];
        connection.query('insert into examdones(StudentId, SubjectId) select students.Id, subjects.Id from students join subjects where subjects.Descr=? and students.jambregno=?', [req.body.subject, req.user.username], function(err, rowse) {
            //     connection.query("select exams.NoOfQuest from exams join subjects on subjects.Id=exams.SubjectId where subjects.Code=?", [req.body.code], (err, QuestsNo) => {
            connection.query("select count(*) as NoOfQuest from questions join subjects on questions.subjectid=subjects.Id where subjects.Descr=?", [req.body.subject], (err, QuestsNo) => {
                connection.query("select count(*) as data from questions join subjects on subjects.Id=questions.SubjectId where subjects.Descr = ?", [req.body.subject], (err, countrows) => {

                    var QuestsNumba = QuestsNo[0].NoOfQuest;
                    var questcount = countrows[0].data;
                    var query = connection.query("select questions.Id,questions.Descr,questions.SubjectId, questions.Instruction, questions.PicPath from questions join subjects on subjects.Id=questions.SubjectId where subjects.Descr='" + req.body.subject + "'");
                    query.on('result', function(rows) {
                        nge(null, rows);
                    })

                    var nge = function(err, result) {
                        connection.query("select * from options where questionId='" + result.Id + "'", (errk, rows) => {
                            retData(null, { "Question": result, "Option": rows });
                        })
                    }

                    var quest = '<Questions id="' + rowse.insertId + '">';
                    var co = 0;
                    var retData = function(err, result) {
                        //   console.log("What to form questions: " + JSON.stringify(result));
                        var dat = '<ScriptQuestions><Question id="' + result.Question.Id + '">' + result.Question.Descr + '</Question>' +
                            '<OptionA id="' + result.Option[0].Id + '">' + result.Option[0].Descr + '</OptionA>' +
                            '<OptionB id="' + result.Option[1].Id + '">' + result.Option[1].Descr + '</OptionB>' +
                            '<OptionC id="' + result.Option[2].Id + '">' + result.Option[2].Descr + '</OptionC>' +
                            '<OptionD id="' + result.Option[3].Id + '">' + result.Option[3].Descr + '</OptionD></ScriptQuestions>';
                        quest += dat;
                        questionss.push(dat)
                        co++;

                        if (co == questcount) {
                            fra(null, quest, questionss);
                        }
                    }
                    var nos = [];
                    var fra = function(err, resusts, arr) {
                        var trol = resusts + "</Questions>";
                        /*  For random question generation
                                 for (var ca = 0; ca < QuestsNumba; ca++) {
                            var val = randomInt(1, questcount);
                            if (IsinArray(val, nos)) {
                                ca--;
                            } else {
                                nos[ca] = val;
                            }
    
                        }
    */

                        /**
                         * For non-random question generation
                         */

                        for (var ca = 0; ca < QuestsNumba; ca++) {
                            nos[ca] = ca + 1;
                        }

                        var touch = "";

                        nos.forEach(function(element) {
                            touch += questionss[element - 1];
                        }, this);

                        res.end('<Questions id="' + rowse.insertId + '">' + touch + '</Questions>');
                        //  res.end(trol);
                    }
                });
            });
        });
    }
};
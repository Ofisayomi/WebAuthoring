var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Oluwfisay@12",
    database: "OnVAc"
});

module.exports = class User {

    GetTopic(subjectId) {

        return new Promise((resolve, reject) => {
            connection.query('select Topic.Description,Content.Id from Content join Topic on Content.TopicId=Topic.Id join Course on Topic.CourseId=Course.Id where Course.Id=?', [subjectId], function(err, rows) {
                if (err) {

                    reject(err)
                } else {
                    resolve(rows);
                }
            })
        });
    }

    GetContentTopics(sub) {
        return new Promise((resolve, reject) => {
            connection.query('select Topic.Description from Topic join Course on Topic.CourseId=Course.Id where Course.Id=?', [sub], function(err, rows) {
                if (err) {

                    reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    }

    Create(email, password, username, firstname, lastName, othername, gender, phonenumber, role) {
        return new Promise((resolve, reject) => {
            var picture = "/Users/user.png";
            console.log('Inserting into users');

            connection.query('insert into User(email, password, picture, Username, RoleId) select ?, ?, ?, ?, Role.Id from Role where Role.Description=?', [email, password, picture, username, role], function(err, rows) {
                if (err) {

                    reject({
                        message: err
                    });
                } else {
                    console.log('New User creation successful ' + JSON.stringify(rows));

                    connection.query('insert into students(Names, JambRegNo, PicPath, Password, ClassId) values( ?, ?, ?, ?, 5)', [firstname + ' ' + lastName, email, picture, password]);
                    connection.query('insert into Biodata(FirstName, LastName, Othername, State, Country, City, DOB, Gender, PhoneNumber, UserId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstname, lastName, othername, '', '', '', new Date().toLocaleDateString(), gender, phonenumber, rows.insertId], function(er, row) {
                        if (err) {
                            console.log('Biodata error: ' + er)
                            reject({
                                message: er
                            });
                        } else {
                            resolve({
                                message: 'User registration successful'
                            });
                        }
                    });
                }
            });
        });
    }


    ExamResults() {
        var cc = [];
        var count = 0;
        var status = false;
        var selectquery = "";
        var rol = "";

        return new Promise((resolve, reject) => {

            selectquery = 'select examdones.Id as Id, subjects.Descr as Subject, count(examquestions.QuestionId) as Counts, students.`Names` as Name, students.JambRegNo as RegNo from examquestions join examdones on examdones.Id=examquestions.ExamDoneId join students on students.Id=examdones.StudentId join subjects on subjects.Id=examdones.SubjectId group by examquestions.ExamDoneId';
            connection.query('select count(distinct examquestions.ExamDoneId) as Length from examquestions', (CountErr, CountData) => {
                var query = connection.query(selectquery);
                query.on('result', (data) => {

                    connection.query('select count(examquestions.OptionId) as Counts from examquestions join options on options.Id=examquestions.OptionId where examquestions.ExamDoneId=? and options.IsAnswer=1', [data.Id], (err, rows) => {
                        //      Stud.drudge(data.Name, data.Subject, data.Counts, rows[0].Counts, status, CountData[0].Length);
                        //       console.log(data.Id);
                        count++;
                        if (count == CountData[0].Length) {
                            cc.push([data.Name, data.Subject, rows[0].Counts, data.Counts, data.RegNo]);
                            resolve(cc);
                        } else {
                            cc.push([data.Name, data.Subject, rows[0].Counts, data.Counts, data.RegNo]);
                        }
                    });

                });
            })

        })
    }

    Login(username, password) {
        return new Promise((resolve, reject) => {
            connection.query('select username, RoleId from User where username=? and password=?', [username, password], function(err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    }

    GetContent(Subject, Topic) {
        return new Promise((resolve, reject) => {
            connection.query('select Content.Content from Content join Topic on Topic.Id=Content.TopicId join Course on Course.Id=Topic.CourseId where Course.Description=? and Topic.Description=? ', [Subject, Topic], function(err, rows) {
                if (err) {
                    reject('Error')
                } else {
                    resolve(rows);
                }
            })
        })
    }

    GetContentById(Id) {
        return new Promise((resolve, reject) => {
            connection.query('select Content.Content, Content.File, Content.Id from Content where Content.Id=? ', [Id], function(err, rows) {
                if (err) {
                    reject('Error')
                } else {
                    resolve(rows);
                }
            })
        })
    }

    GetObjectives(ContentId) {
        return new Promise((resolve, reject) => {
            connection.query('select Objectives.Description from Objectives join Content on Content.TopicId=Objectives.TopicId where Content.Id=?', [ContentId], function(err, rows) {
                if (err) {
                    reject('Error')
                } else {
                    resolve(rows);
                }
            })
        })
    }

    GetTopicByContentId(ContentId) {
        return new Promise((resolve, reject) => {
            connection.query('select Topic.Id, Topic.Description, Topic.ObjIntro from Topic join Content on Content.TopicId=Topic.Id where Content.Id=?', [ContentId], function(err, rows) {
                if (err) {
                    reject('Error')
                } else {
                    resolve(rows);
                }
            })
        })
    }

    GetDetails(username) {
        return new Promise((resolve, reject) => {
            connection.query('select User.Id, User.Picture,Biodata.PhoneNumber, Biodata.Firstname, Biodata.Lastname, Biodata.Othername, User.email, Biodata.Country, Biodata.State, Biodata.City, Biodata.DOB, Biodata.Gender from User join Biodata on User.Id=Biodata.UserId where User.email=?', [username], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]);
                }
            });
        });
    }

    CheckEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('select email from User where email=?', [email], function(err, rows) {
                if (rows.length > 0) {
                    console.log('email response :' + rows.length);
                    resolve(true);
                } else {
                    if (err) {
                        reject({ status: false, message: err });
                    } else {

                        resolve(false);
                    }
                }
            });
        });
    }

    CheckRole(Username) {
        return new Promise((resolve, reject) => {
            connection.query('select Role.Description from Role join User on User.RoleId=Role.Id where User.email=?', [Username], function(err, rows) {
                resolve(rows[0].Description);
            });
        });

    }

    GetRole(Role) {
        return new Promise((resolve, reject) => {
            connection.query('select Id from Role where description=?', [Role], function(err, rows) {
                if (rows.length > 0) {
                    resolve(rows[0].Id);
                } else {
                    reject(err);
                }
            })
        })
    }

    CheckCode(code) {
        return new Promise((resolve, reject) => {
            connection.query('select Code from Course where Code=?', [code.toLowerCase()], function(err, rows) {
                if (err) {
                    console.log(err);
                    reject(false);
                } else if (rows.length > 0) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        })
    }

    GetSubject() {
        return new Promise((resolve, reject) => {
            connection.query('select Id, Description from Course', [], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
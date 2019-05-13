var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');
var BetterMemory = require('session-memory-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var student = require('./routes/Students/index');
var tutor = require('./routes/Tutors/index');
var TutorTopic = require('./routes/Tutors/Topic');
var TutorContent = require('./routes/Tutors/Content');
var TutorObjective = require('./routes/Tutors/Objective');
var TutorProfile = require('./routes/Tutors/Profile');
var TutorEdit = require('./routes/Tutors/EditProfile');
var TutorMessage = require('./routes/Tutors/Message');
var TutorQuestion = require('./routes/Tutors/Question');
var TutorResult = require('./routes/Tutors/Result');
var Admin = require('./routes/Admin/index');
var AdminProfile = require('./routes/Admin/Profile');
var AdminCourse = require('./routes/Admin/Course');
var StudentListTopics = require('./routes/Students/ListTopics');
var LessonObj = require('./routes/Students/LessonObj');
var Logout = require('./routes/LogOut');
var TutorPass = require('./routes/Tutors/Password');

var StudentReader = require('./routes/Students/Reader');
var StudentTopic = require('./routes/Students/Topics');
var StudentResult = require('./routes/Students/Result');
var StudentQuestion = require('./routes/Students/Question');
var StudentPass = require('./routes/Students/Password');
var AdminPass = require('./routes/Admin/Password');

var AddUser = require('./routes/Admin/AddUser');
var Students = require('./routes/Library/Students');
var Acts = require('./routes/Library/Acts');
var Act = new Acts();
var Stud = new Students();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10000mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use(cookieParser('oners_virtual'));
app.use(express.static(path.join(__dirname, 'public')));

var store = new BetterMemory({
    expires: 60 * 600 * 10000,
    checkperiod: 10 * 60
});


app.use(session({ name: 'OnersVirtual', store: store, secret: 'OnersVirtual@fissy', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/Students', student);
app.use('/Tutor', tutor);
app.use('/TutorTopic', TutorTopic);
app.use('/Tutor/TutorContent', TutorContent);
app.use('/TutorObjective', TutorObjective);
app.use('/TutorProfile', TutorProfile);
app.use('/EditProfile', TutorEdit);
app.use('/TutorMessage', TutorMessage);
app.use('/TutorQuestion', TutorQuestion);
app.use('/Admin', Admin);
app.use('/AdminProfile', AdminProfile);
app.use('/AddUser', AddUser);
app.use('/Course', AdminCourse);
app.use('/Students/Reader', StudentReader);
app.use('/Students/Topics', StudentTopic);
app.use('/Student/Topics', StudentListTopics);
app.use('/Students/LessonObj', LessonObj);
app.use('/Students/Question', StudentQuestion);
app.use('/Students/questions', Act.ReadTests);
app.use('/Students/ExamTime', Act.GetExamTime);
app.use('/Students/Ans', Act.GetAns);
app.use('/Students/Submit', Act.Submit);
app.use('/Students/Result', StudentResult);
app.use('/Students/UpdatePassword', StudentPass);

app.use('/Admin/RegisterUser', Stud.CreateTop);
app.use('/Admin/ActivateUser', Stud.UserStatus);
app.use('/Admin/CreateCourse', Act.CreateCourse);
app.use('/Tutor/CreateTopic', Act.CreateTopic);
app.use('/Tutor/GetTopic', Act.GetTopic);
app.use('/Tutor/CreateObj', Act.CreateObj);
app.use('/Tutor/CreateContent', Act.CreateContent);
app.use('/Tutor/CreateQuestion', Act.CreateQuestion);
app.use('/Tutor/Result', TutorResult);
app.use('/Tutor/Update', Act.UpdateProfile);
app.use('/Tutor/Updatepic', Act.UpdatePic);
app.use('/Tutor/UpdatePassword', Act.UpdatePassword);
app.use('/Tutor/Password', TutorPass);
app.use('/Admin/Password', AdminPass);

app.use('/Logout', Logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
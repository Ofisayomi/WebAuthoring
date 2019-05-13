angular
    .module('StudentApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/Topic', {
                templateUrl: '/TutorTopic'
            })
            .when('/Objective', {
                templateUrl: '/TutorObjective'
            })
            .when('/Content', {
                templateUrl: '/Tutor/TutorContent'
            })
            .when('/Profile', {
                templateUrl: '/TutorProfile'
            })
            .when('/TutorEdit', {
                templateUrl: '/EditProfile'
            })
            .when('/Message', {
                templateUrl: '/TutorMessage'
            })
            .when('/Question', {
                templateUrl: '/TutorQuestion'
            })
            .when('/AddUser', {
                templateUrl: '/AddUser'
            })
            .when('/Course', {
                templateUrl: '/Course'
            })
            .when('/StudResult', {
                templateUrl: '/Students/Result'
            })
            .when('/Result', {
                templateUrl: '/Tutor/Result'
            })
            .when('/UpdatePassword', {
                templateUrl: '/Tutor/Password'
            })
            .when('/ChangeAdminPass', {
                templateUrl: '/Admin/Password'
            })
            .when('/StudUpdatePassword', {
                templateUrl: '/Students/UpdatePassword'
            })
            .when('/ListTopic', {
                templateUrl: '/Topics'
            })
            .when('/', {
                templateUrl: '/TutorProfile'
            });

    })
    .controller('SuperCtrl', ['ActService', '$location', function(ActService, $location) {
        var self = this;
        self.Topics;
        self.SetCourse = function(Course) {
            $location.url("/Topic");
            ActService.SetCourse(Course);
            ActService.GetTopic().then((data) => {
                self.Topics = data;
            });
        };

        self.Upload = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    filecontent = e.target.result;
                }
                reader.readAsArrayBuffer(input.files[0]);
                console.log('SuperCtrl file type is: ' + input.files[0].type);
            }
        }

    }])
    .controller('QuestCtrl', ['ActService', '$http', function(ActService, $http) {
        var self = this;
        self.CreateQuestion = function() {

            self.question.subject = ActService.GetCourse();
            $http.post('/Tutor/CreateQuestion', self.question).then((Response) => {
                self.message = Response.data;
                self.question.question = "";
                self.question.IsAnswerA = null;
                self.question.IsAnswerB = null;
                self.question.IsAnswerC = null;
                self.question.IsAnswerD = null;
                self.question.OptionA = "";
                self.question.OptionB = "";
                self.question.OptionC = "";
                self.question.OptionD = "";
            }, (err) => {
                console.log(err);
                self.message = "* An error occurred...";
            })
        }
    }])
    .controller('RegisterUserCtrl', ['$http', function($http) {
        var self = this;
        self.SubmitUser = function() {

            $http.post('/Admin/RegisterUser', self.user).then((Response) => {
                self.message = Response.data;
                self.user = null;
            }, (err) => {
                console.log('Error: ' + JSON.stringify(err));
            });
        };
    }])
    .controller('AddTopicCtrl', ['$http', 'ActService', function($http, ActService) {
        var self = this;

        self.CreateTopic = function() {
            self.topic.course = ActService.GetCourse();
            $http.post('/Tutor/CreateTopic', self.topic).then((Response) => {
                self.message = Response.data;
                self.topic.course = "";
            }, (err) => {
                self.message = '* Reselect Subject of your choice before performing action again';
            });
        }
    }])
    .controller('AddContentCtrl', ['$http', 'ActService', function($http, ActService) {
        var self = this;
        self.CreateContent = function() {

            var urlparams = new URLSearchParams(window.location.search);
            var course = urlparams.get('sub');

            self.content.course = course;
            ActService.SetCourse(course);
            var input = document.getElementById('ContentFile');
            self.content.cont = document.getElementById('placeholder-editor').value;
            if (self.content.cont == "") {
                self.message = "* Empty content detected...";
            } else {
                try {
                    if (input.files && input.files[0]) {
                        //    if (input.files[0].size / 1024 / 1024 < 20) {
                        //    self.message = '* File size must not be more than 20MB';
                        //        } else {


                        var reader = new FileReader();
                        reader.onload = function(e, ev) {

                            self.content.filename = input.files[0].name;
                            self.content.filecontent = e.target.result.split(',')[1];

                            $http.post('/Tutor/CreateContent', self.content).then((Response) => {
                                console.log("Response Data: " + Response);
                                self.message = Response.data;
                                self.topic = null;
                                document.getElementById('placeholder-editor').value = "";
                            }, (err) => {
                                console.log(err);
                                self.message = err;
                            });


                        };

                        reader.readAsDataURL(input.files[0]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }])
    .controller('AddObjCtrl', ['$http', 'ActService', function($http, ActService) {
        var self = this;

        self.CreateObj = function() {
            var subject = ActService.GetCourse();
            self.objective.subject = subject;

            $http.post('/Tutor/CreateObj', self.objective).then((Response) => {
                self.message = Response.data;
                self.objective.subject = "";
            }, (Err) => {
                console.log(Err);
            });
        }

        self.UpdatePassword = function() {
            $http.post('/Tutor/UpdatePassword', self.password).then((Response) => {
                self.message = Response.data;
                self.password.old = "";
                self.password.new = "";
                self.password.confirm = "";
            }, (Err) => {
                console.log(Err);
            });
        }
    }])
    .controller('CourseCtrl', ['$http', function($http) {
        var self = this;
        self.CreateCourse = function() {
            $http.post('/Admin/CreateCourse', self.course).then((Response) => {
                self.message = Response.data;
            }, (err) => {
                console.log(err);
            });
        }
    }])
    .factory('ActService', ['$http', function($http) {

        var Course;
        return {
            GetCourse: function() {
                return this.Course;
            },
            SetCourse: function(Course) {
                this.Course = Course;
            },
            GetTopic: function() {
                return new Promise((resolve, reject) => {
                    var subject = this.GetCourse();
                    console.log('Subject to post: ' + subject);
                    $http.post('/Tutor/GetTopic', { subject: subject }).then(function(Response) {
                        resolve(Response.data);
                    }, function(err) {
                        reject(err);
                    })
                })
            },
            Upload: function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        filecontent = e.target.result;
                    }
                    reader.readAsBinaryString(input.files[0]);

                    console.log('file type is: ' + input.files[0].type);
                    console.log('file type is: ' + filecontent);
                }
            }
        }
    }]);

/** @ngInject */
/// <reference path="jquery-1.8.2.js" />

var clickey;
var doc;
var questno = 0;
var test = new XMLSerializer();
var posi;
var selected;
var tope;
var tool;

function checkedAnswered() {
    var questione = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);
    tool = 0;
    for (var coue = 0; coue < clickey.firstChild.childNodes.length; coue++) {
        var caoche = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[0].firstChild);

        if (caoche == questione) {
            var ok = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[1]);

            if (ok == "<option/>") {
                deactivate();
                tool++;
            } else {
                posi = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[1].firstChild);
            }

        }
    }

}

function getcontrolposition(position_x) {
    if (position_x == 1) {
        $('#Option1').prop('checked', true);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', false);
    } else if (position_x == 2) {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', true);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', false);
    } else if (position_x == 3) {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', true);
        $('#Option4').prop('checked', false);
    } else {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', true);
    }
}

function mark2(OptId) {
    var questId = $(doc.firstChild.childNodes[questno].childNodes[0]).attr('id');
    for (var cot = 0; cot < dd.length; cot++) {
        if (dd[cot][0] == questId) {
            console.log('Question found');
            dd[cot][1] = OptId;
        }
    }
}

function mark(picked) {

    var question = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);

    for (var cou = 0; cou < clickey.firstChild.childNodes.length; cou++) {
        var caoch = test.serializeToString(clickey.firstChild.childNodes[cou].childNodes[0].firstChild);
        if (caoch == question) {
            clickey.firstChild.childNodes[cou].childNodes[1].innerHTML = picked;
        }

    }

}

function deactivate() {
    $('#Option1').prop('checked', false);
    $('#Option2').prop('checked', false);
    $('#Option3').prop('checked', false);
    $('#Option4').prop('checked', false);
}

var testy = [];

function ReadAnswer() {
    // This generates the xml document which contains the questions and the selected options
    var questionso = '';
    var optionso = '';
    var retor = '';
    for (var counti = 0; counti < clickey.firstChild.childNodes.length; counti++) {
        questions = test.serializeToString(clickey.firstChild.childNodes[counti].childNodes[0].firstChild);

        if (clickey.firstChild.childNodes[counti].childNodes[1].firstChild == null) {
            options = '';
        } else {
            optionso = test.serializeToString(clickey.firstChild.childNodes[counti].childNodes[1].firstChild);
        }
        retor += '™' + questions + '©' + optionso;
    }
    return retor;
}

function SubmitAnswer() {
    // This method submits the answer to the server side of the application
    //  var coola = ReadAnswer();
    var done = $(doc.firstChild).attr('id');

    $.ajax({
        type: 'POST',
        url: '/Students/Submit',
        data: { data: dd, length: dd.length, done: done },
        // contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        success: function(result) {

            alert('Submission Successful...');
            $(location).attr('href', '/Students');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            $(location).attr('href', '/Students');
        }
    });
}

var url = new URL(window.location.href);
var subcode = url.searchParams.get('code');

window.onload = function() {

    deactivate();
    var userId = url.searchParams.get('Id');
    var subj = url.searchParams.get('subj');
    $.ajax({
        type: 'POST',
        url: '/Students/questions',
        data: { subject: subj },
        //    contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function(result) {
            process(result);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            //      $(location).attr('href', 'selectexam.html');
        }
    });

    $.ajax({
        type: 'POST',
        url: '/actions/CandiInfo',
        data: '{"regno":"' + userId + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(result) {
            //     UserAss(result);
        },

        error: function(xhr, ajaxOptions, thrownError) {
            //        alert(xhr.responseText);

        }
    });

    $('#btnStart').click(function() {
        SubmitAnswer();
    });

    $('#btnSubmitQuest').click(function() {
        SubmitAnswer();
    });
    var quests;

    // Beginning of click event for the radio option controls
    $('#Option1').click(function() {
        UpdateButtons();

        mark2($(doc.firstChild.childNodes[questno].childNodes[1]).attr('id'));
        picked = test.serializeToString(document.getElementById("Option1").nextElementSibling.nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;
    });

    $('#Option2').click(function() {
        UpdateButtons();
        mark2($(doc.firstChild.childNodes[questno].childNodes[2]).attr('id'));
        picked = test.serializeToString(document.getElementById("Option2").nextElementSibling.nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;

    });

    $('#Option3').click(function() {
        UpdateButtons();
        mark2($(doc.firstChild.childNodes[questno].childNodes[3]).attr('id'));
        picked = test.serializeToString(document.getElementById("Option3").nextElementSibling.nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;

    });

    $('#Option4').click(function() {
        UpdateButtons();
        mark2($(doc.firstChild.childNodes[questno].childNodes[4]).attr('id'));
        picked = test.serializeToString(document.getElementById("Option4").nextElementSibling.nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;

    });
    // End of click event for the radio option controls

    $('#back').click(function() {
        /** -This click event decrease the status of the present question by one
         * 
         */
        if (questno == 0) {

            questno = tope - 1;

        } else {
            questno--;
        }

        UpdateQuest();
    });
    $('#forward').click(function() {
        /** -This click event increase the status of the present question by one
         * 
         */
        if (questno == (tope - 1)) {

            questno = 0;
        } else {

            questno++;
        }
        //    deactivate();
        UpdateQuest();
    });


    var xx = 59;
    var min = 10;

};

function UserAss(data) {
    //   alert(JSON.stringify(data[0].Names));
    $('#Userpic').attr('src', data[0].PicPath);
    $('#UserName').html('Welcome: <br>' + data[0].Names);
    $('#RegNo').html('<b>Reg. No: </b>' + data[0].JambRegNo.toUpperCase())
}

function UpdateButtons() {
    $('#buttoncontainer input').each(function() {

        var text = $(this).val();
        if ((questno + 1) == text) {
            $(this).css('background-color', '#DD9999');
            $(this).css('width', '55px');
            $(this).css('height', '22px');
            $(this).css('border-radius', '5px 5px 5px 5px');
        }
    });
}

function UpdateQuest() {
    /**
     * This gets the selected option position for the present question and use it to update the status of the 
     *  radio controls while non is selected if the question has not been answered.
     */

    checkedAnswered();
    document.getElementById("Quest").innerHTML = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);
    var optAi = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[1].firstChild);
    var optBi = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[2].firstChild);
    var optCi = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[3].firstChild);
    var optDi = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[4].firstChild);

    document.getElementById("lblOpt1").innerHTML = optAi;
    document.getElementById("lblOpt2").innerHTML = optBi;
    document.getElementById("lblOpt3").innerHTML = optCi;
    document.getElementById("lblOpt4").innerHTML = optDi;

    if (posi == optAi) {
        getcontrolposition(1);
    } else if (posi == optBi) {
        getcontrolposition(2);
    } else if (posi == optCi) {
        getcontrolposition(3);
    } else if (posi == optDi) {
        getcontrolposition(4);
    }
    var telly = questno + 1;
    document.getElementById("QuestNo").innerHTML = telly;
}

function CallAnswer() {
    /* This method retrieves an xml file from the database which will be used for the collection of options
    student picked per question
   */
    $.ajax({
        type: 'POST',
        url: '/Students/Ans',
        data: '{"QuestNo":"' + tope + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function(result) {
            //   alert(test.serializeToString(result));
            ProcessAnswer(result);
        },
        error: function(xhr, ajaxOptions, thrownError) {

        }
    });

    /*    var questNo = QuestNo;
        //  console.log(questNo);
        var data = "<ScriptAnswers>";
        for (var count = 0; count < questNo; count++) {
            data += '<ScriptAnswer><Question></Question><option></option></ScriptAnswer>';
        }

        ProcessAnswer(data + "</ScriptAnswers>");*/

}

function checkPicked() {
    /** -This method calculates the number of questions that has been answered based on the number of empty option
     *  tag in the answers xml file.
     */
    var not = 0;
    for (var colo = 0; colo < clickey.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
            not++;
        }
    }
    return not;
}

function ProcessAnswer(toUse) {
    /** -This method assign the question values into the retrieved xml file used for collection of selected
     * answers while the option part of each is assigned an empty string 
     */
    var coo = toUse.firstChild.childNodes.length;
    for (var count = 0; count < coo; count++) {
        toUse.firstChild.childNodes[count].childNodes[0].innerHTML = test.serializeToString(doc.firstChild.childNodes[count].childNodes[0].firstChild);
        toUse.firstChild.childNodes[count].childNodes[1].innerHTML = "";
    }
    //   console.log(toUse);
    clickey = toUse;
}

var dd = [, ];

function process(res) {

    /**-This Method read the question and options from the xml document that contains the questions
     * -Reads the question length
     * -Generate the link buttons for the questions
     */

    var cc = new DOMParser();
    resp = test.serializeToString(res);
    doc = cc.parseFromString(resp, "text/xml");

    tope = doc.firstChild.childNodes.length;

    document.getElementById("Quest").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[0].firstChild);
    document.getElementById("lblOpt1").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt2").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt3").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt4").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[4].firstChild);

    var buttons = "";
    for (var c = 0; c < tope; c++) {
        d = c + 1;
        buttons += '<input type="button" value="' + d + '"/>';
    }

    for (var ccot = 0; ccot < tope; ccot++) {

        dd[ccot] = [$(doc.firstChild.childNodes[ccot].childNodes[0]).attr('id'), ""];
    }

    //var co = document.getElementById("buttoncontainer");
    //co.innerHTML = buttons;
    $('#buttoncontainer').html(buttons);

    $('#buttoncontainer input').click(function() {

        /**-This registers the click event for the input button generated         * 
         */

        questno = $(this).val() - 1;
        $('#QuestNo').html(questno + 1);
        UpdateQuest();
    });

    GetExamTime();
    CallAnswer();
}



function GetExamTime() {
    /** -This method retrieves the configured subject's examination time from the database 
     * - Starts the examination timer based on the time it retrieves from the database with the supplied subject code
     */

    $.ajax({
        type: 'POST',
        url: '/Students/ExamTime',
        data: '{"SubjectCode":"' + 7 + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(result) {
            //     alert("Time:" + JSON.stringify(result));

            //     $('#SubCode').html(result.descr);
            var time = document.getElementById('time');
            xx = 59;
            var timer = JSON.stringify(result.descr);
            min = timer - 1;

            setInterval(function() {
                xx--;
                if (xx == 0) {
                    if (min == 0 && xx == 0) {
                        SubmitAnswer();

                    } else {
                        xx = 59;
                        min--;
                    }
                }

                time.innerHTML = min.toString() + " : " + xx.toString();

            }, 1000);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}
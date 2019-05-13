/// <reference path="jquery-1.8.2.js" />

var clickey;
var clickey1;
var clickey2;
var clickey3;

var doc;
var doc1;
var doc2;
var doc3;
var questno = 0;
var questno1 = 0;
var questno2 = 0;
var questno3 = 0;
var test = new XMLSerializer();
var test1 = new XMLSerializer();
var test2 = new XMLSerializer();
var test3 = new XMLSerializer();
var posi;
var posi1;
var posi2;
var posi3;
var selected;
var tope;
var tope1;
var tope2;
var tope3;

var tool;

function checkedAnswered() {
    var questione = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);
    tool = 0;
   
    for (var coue = 0; coue < clickey.firstChild.childNodes.length; coue++)
    {
        var caoche = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[0].firstChild);
      
        if (caoche == questione)
        {
            var ok = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[1]);
        
            if (ok == "<option/>") {
                deactivate();
                tool++;
            }
            else {
                posi = test.serializeToString(clickey.firstChild.childNodes[coue].childNodes[1].firstChild);
            }
         
        }
    }

}
function checkedAnswered1() {
    var questione = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[0].firstChild);
    tool1 = 0;
  
    for (var coue = 0; coue < clickey1.firstChild.childNodes.length; coue++) {
        var caoche = test1.serializeToString(clickey1.firstChild.childNodes[coue].childNodes[0].firstChild);
        if (caoche == questione) {
            var ok = test1.serializeToString(clickey1.firstChild.childNodes[coue].childNodes[1]);
            
            if (ok == "<option/>") {
                deactivate1();
                tool1++;
            }
            else {
                posi1 = test1.serializeToString(clickey1.firstChild.childNodes[coue].childNodes[1].firstChild);
            }

        }
    }

}
function checkedAnswered2() {
    var questione = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[0].firstChild);
    tool1 = 0;
    for (var coue = 0; coue < clickey2.firstChild.childNodes.length; coue++) {
        var caoche = test1.serializeToString(clickey2.firstChild.childNodes[coue].childNodes[0].firstChild);
     //   alert(caoche);
        if (caoche == questione) {
            var ok = test1.serializeToString(clickey2.firstChild.childNodes[coue].childNodes[1]);

            if (ok == "<option/>") {
                deactivate2();
               
                tool1++;
            }
            else {
                posi2 = test1.serializeToString(clickey2.firstChild.childNodes[coue].childNodes[1].firstChild);
            }

        }
    }
}
function checkedAnswered3() {
    var questione = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[0].firstChild);
    tool1 = 0;
    for (var coue = 0; coue < clickey3.firstChild.childNodes.length; coue++) {
        var caoche = test1.serializeToString(clickey3.firstChild.childNodes[coue].childNodes[0].firstChild);
        //   alert(caoche);
        if (caoche == questione) {
            var ok = test1.serializeToString(clickey3.firstChild.childNodes[coue].childNodes[1]);

            if (ok == "<option/>") {
                deactivate3();

                tool1++;
            }
            else {
                posi3 = test1.serializeToString(clickey3.firstChild.childNodes[coue].childNodes[1].firstChild);
            }

        }
    }
}

function getcontrolposition(position_x)
{
    if (position_x == 1)
    {
        $('#Option1').prop('checked', true);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', false);
    }
    else if (position_x == 2)
    {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', true);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', false);
    }
    else if (position_x == 3)
    {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', true);
        $('#Option4').prop('checked', false);
    }
    else
    {
        $('#Option1').prop('checked', false);
        $('#Option2').prop('checked', false);
        $('#Option3').prop('checked', false);
        $('#Option4').prop('checked', true);
    }
}
function getcontrolposition1(position_x) {
    if (position_x == 1) {
        $('#Option11').prop('checked', true);
        $('#Option12').prop('checked', false);
        $('#Option13').prop('checked', false);
        $('#Option14').prop('checked', false);
    }
    else if (position_x == 2) {
        $('#Option11').prop('checked', false);
        $('#Option12').prop('checked', true);
        $('#Option13').prop('checked', false);
        $('#Option14').prop('checked', false);
    }
    else if (position_x == 3) {
        $('#Option11').prop('checked', false);
        $('#Option12').prop('checked', false);
        $('#Option13').prop('checked', true);
        $('#Option14').prop('checked', false);
    }
    else {
        $('#Option11').prop('checked', false);
        $('#Option12').prop('checked', false);
        $('#Option13').prop('checked', false);
        $('#Option14').prop('checked', true);
    }
}
function getcontrolposition2(position_x) {
    if (position_x == 1) {
      
        $('#Option21').prop('checked', true);
        $('#Option22').prop('checked', false);
        $('#Option23').prop('checked', false);
        $('#Option24').prop('checked', false);
    }
    else if (position_x == 2) {
       
        $('#Option21').prop('checked', false);
        $('#Option22').prop('checked', true);
        $('#Option23').prop('checked', false);
        $('#Option24').prop('checked', false);
    }
    else if (position_x == 3) {
       
        $('#Option21').prop('checked', false);
        $('#Option22').prop('checked', false);
        $('#Option23').prop('checked', true);
        $('#Option24').prop('checked', false);
    }
    else {
      
        $('#Option21').prop('checked', false);
        $('#Option22').prop('checked', false);
        $('#Option23').prop('checked', false);
        $('#Option24').prop('checked', true);
    }
}
function getcontrolposition3(position_x) {
    if (position_x == 1) {

        $('#Option31').prop('checked', true);
        $('#Option32').prop('checked', false);
        $('#Option33').prop('checked', false);
        $('#Option34').prop('checked', false);
    }
    else if (position_x == 2) {

        $('#Option31').prop('checked', false);
        $('#Option32').prop('checked', true);
        $('#Option33').prop('checked', false);
        $('#Option34').prop('checked', false);
    }
    else if (position_x == 3) {

        $('#Option31').prop('checked', false);
        $('#Option32').prop('checked', false);
        $('#Option33').prop('checked', true);
        $('#Option34').prop('checked', false);
    }
    else {

        $('#Option31').prop('checked', false);
        $('#Option32').prop('checked', false);
        $('#Option33').prop('checked', false);
        $('#Option34').prop('checked', true);
    }
}

function mark(picked)
{
    var question = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);
    
    for (var cou = 0; cou < clickey.firstChild.childNodes.length; cou++)
    {
        var caoch = test.serializeToString(clickey.firstChild.childNodes[cou].childNodes[0].firstChild);
        if (caoch == question)
        {
            clickey.firstChild.childNodes[cou].childNodes[1].innerHTML = picked;
        }
        
    }
   
}
function mark1(picked) {
    var question = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[0].firstChild);

    for (var cou = 0; cou < clickey1.firstChild.childNodes.length; cou++) {
        var caoch = test1.serializeToString(clickey1.firstChild.childNodes[cou].childNodes[0].firstChild);
        if (caoch == question) {
            clickey1.firstChild.childNodes[cou].childNodes[1].innerHTML = picked;
        }

    }

}
function mark2(picked1) {
    var question = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[0].firstChild);

    for (var cou = 0; cou < clickey2.firstChild.childNodes.length; cou++) {
        var caoch = test1.serializeToString(clickey2.firstChild.childNodes[cou].childNodes[0].firstChild);
        if (caoch == question) {
            clickey2.firstChild.childNodes[cou].childNodes[1].innerHTML = picked1;
        }
    }   
}
function mark3(picked1) {
    var question = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[0].firstChild);

    for (var cou = 0; cou < clickey3.firstChild.childNodes.length; cou++) {
        var caoch = test1.serializeToString(clickey3.firstChild.childNodes[cou].childNodes[0].firstChild);
        if (caoch == question) {
            clickey3.firstChild.childNodes[cou].childNodes[1].innerHTML = picked1;
        }
    }


}

function deactivate()
{
    $('#Option1').prop('checked', false);
    $('#Option2').prop('checked', false);
    $('#Option3').prop('checked', false);
    $('#Option4').prop('checked', false);
}
function deactivate1() {
    $('#Option11').prop('checked', false);
    $('#Option12').prop('checked', false);
    $('#Option13').prop('checked', false);
    $('#Option14').prop('checked', false);
}
function deactivate2() {
    $('#Option21').prop('checked', false);
    $('#Option22').prop('checked', false);
    $('#Option23').prop('checked', false);
    $('#Option24').prop('checked', false);
}
function deactivate3() {
    $('#Option31').prop('checked', false);
    $('#Option32').prop('checked', false);
    $('#Option33').prop('checked', false);
    $('#Option34').prop('checked', false);
}

var testy = [];

function ReadAnswer()
{
    var questionso = '';
    var optionso = '';
    var retor = '';
    for (var counti = 0; counti < clickey.firstChild.childNodes.length; counti++)
    {
        questions = test.serializeToString(clickey.firstChild.childNodes[counti].childNodes[0].firstChild);//+'&&&'+;
     
        if (clickey.firstChild.childNodes[counti].childNodes[1].firstChild == null) {
            options = '';
        }
        else {
            optionso = test.serializeToString(clickey.firstChild.childNodes[counti].childNodes[1].firstChild);
        }
        retor += '™' + questions + '©' + optionso;
    }
    return retor;
}
function ReadAnswer1() {
    var questionso = '';
    var optionso = '';
    var retor = '';
    
    for (var counti = 0; counti < clickey1.firstChild.childNodes.length; counti++) {
        questions1 = test.serializeToString(clickey1.firstChild.childNodes[counti].childNodes[0].firstChild);//+'&&&'+;

        if (clickey1.firstChild.childNodes[counti].childNodes[1].firstChild == null) {
            options = '';
        }
        else {
            optionso = test.serializeToString(clickey1.firstChild.childNodes[counti].childNodes[1].firstChild);
        }
        retor += '™' + questions1 + '©' + optionso;
    }
    return retor;
}
function ReadAnswer2() {
    var questionso = '';
    var optionso = '';
    var retor = '';
    for (var counti = 0; counti < clickey2.firstChild.childNodes.length; counti++) {
        questions2 = test.serializeToString(clickey2.firstChild.childNodes[counti].childNodes[0].firstChild);//+'&&&'+;

        if (clickey2.firstChild.childNodes[counti].childNodes[1].firstChild == null) {
            options = '';
        }
        else {
            optionso = test.serializeToString(clickey2.firstChild.childNodes[counti].childNodes[1].firstChild);
        }
        retor += '™' + questions2 + '©' + optionso;
    }
    return retor;
}
function ReadAnswer3() {
    var questionso = '';
    var optionso = '';
    var retor = '';
    for (var counti = 0; counti < clickey3.firstChild.childNodes.length; counti++) {
        questions3 = test.serializeToString(clickey3.firstChild.childNodes[counti].childNodes[0].firstChild);//+'&&&'+;

        if (clickey3.firstChild.childNodes[counti].childNodes[1].firstChild == null) {
            options = '';
        }
        else {
            optionso = test.serializeToString(clickey3.firstChild.childNodes[counti].childNodes[1].firstChild);
        }
        retor += '™' + questions3 + '©' + optionso;
    }
    return retor;
}

function SubmitAnswer()
{
    var coola = ReadAnswer() + '¬' + ReadAnswer1() + '¬' + ReadAnswer2() + '¬' + ReadAnswer3();
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/SubmitStatus',
        data: '{"xml":"' + coola + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        success: function (result) {
            
                    alert('Submission Successful...');
                    $(location).attr('href', '../StudentPages/StudentPortal.aspx');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
            alert(xhr.responseText);
        }
    });
}

function noback() {
    window.history.forward();
}

window.onload = function () {

    $('#ExamMain').css('visibility', 'hidden');
  
    //   noback();

    $('.SubjectLinks').click(function () {
     //   alert(this.innerText);
    });

    $('.questbtns').click(function () {
        var btnnumber = this.getAttribute("value");
        questno = btnnumber - 1;

        checkedAnswered();
        //    deactivate();
        document.getElementById("Quest").innerHTML = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);

        var optA = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[1].firstChild);
        var optB = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[2].firstChild);
        var optC = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[3].firstChild);
        var optD = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[4].firstChild);

        document.getElementById("lblOpt1").innerHTML = optA;
        document.getElementById("lblOpt2").innerHTML = optB;
        document.getElementById("lblOpt3").innerHTML = optC;
        document.getElementById("lblOpt4").innerHTML = optD;

        if (posi == optA) {
            getcontrolposition(1);
        }
        else if (posi == optB) {
            getcontrolposition(2);
        }
        else if (posi == optC) {
            getcontrolposition(3);
        }
        else if (posi == optD) {
            getcontrolposition(4);
        }
        var telly = questno + 1;
        document.getElementById("QuestNo").innerHTML = telly;


    });
    $('.questbtns1').click(function () {
        var btnnumber = this.getAttribute("value");
    //    alert(btnnumber);
        questno1 = btnnumber - 1;

        checkedAnswered1();
        //    deactivate();
        document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[4].firstChild);

        document.getElementById("lblOpt11").innerHTML = optA;
        document.getElementById("lblOpt12").innerHTML = optB;
        document.getElementById("lblOpt13").innerHTML = optC;
        document.getElementById("lblOpt14").innerHTML = optD;

        if (posi1 == optA) {
            getcontrolposition1(1);
        }
        else if (posi1 == optB) {
            getcontrolposition1(2);
        }
        else if (posi1 == optC) {
            getcontrolposition1(3);
        }
        else if (posi1 == optD) {
            getcontrolposition1(4);
        }
        var telly = questno1 + 1;
        document.getElementById("QuestNo1").innerHTML = telly;
    });
    $('.questbtns2').click(function () {
        var btnnumber = this.getAttribute("value");
        //    alert(btnnumber);
        questno2 = btnnumber - 1;

        checkedAnswered2();
        //    deactivate();
        document.getElementById("Quest2").innerHTML = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[4].firstChild);

        document.getElementById("lblOpt21").innerHTML = optA;
        document.getElementById("lblOpt22").innerHTML = optB;
        document.getElementById("lblOpt23").innerHTML = optC;
        document.getElementById("lblOpt24").innerHTML = optD;

        if (posi2 == optA) {
            getcontrolposition2(1);
        }
        else if (posi2 == optB) {
            getcontrolposition2(2);
        }
        else if (posi2 == optC) {
            getcontrolposition2(3);
        }
        else if (posi2 == optD) {
            getcontrolposition2(4);
        }
       
        var telly = questno2 + 1;
        document.getElementById("QuestNo2").innerHTML = telly;
    });
    $('.questbtns3').click(function () {
        var btnnumber = this.getAttribute("value");
        //    alert(btnnumber);
        questno3 = btnnumber - 1;

        checkedAnswered3();
        //    deactivate();
        document.getElementById("Quest3").innerHTML = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[4].firstChild);

        document.getElementById("lblOpt31").innerHTML = optA;
        document.getElementById("lblOpt32").innerHTML = optB;
        document.getElementById("lblOpt33").innerHTML = optC;
        document.getElementById("lblOpt34").innerHTML = optD;

        if (posi3 == optA) {
            getcontrolposition3(1);
        }
        else if (posi3 == optB) {
            getcontrolposition3(2);
        }
        else if (posi3 == optC) {
            getcontrolposition3(3);
        }
        else if (posi3 == optD) {
            getcontrolposition3(4);
        }

        var telly = questno3 + 1;
        document.getElementById("QuestNo3").innerHTML = telly;
    });

    $('#btnStart').click(function () {
        
        $("#Modes").fadeOut('slow');
        $('#ExamMain').css('visibility', 'visible');
        var collects = window.location.search.substr(1).split('&');
        var codey = collects.toString().split('=')[1];
      //  alert(codey);

        selected = codey
        var regNo = test.serializeToString(document.getElementById('jambreg').firstChild);

        GetQuestions1();
        GetQuestions2();
        GetQuestions3();
        GetQuestions4();

        GetExamTime(selected);
       
    });

    function GetQuestions1()
    {
        $.ajax({
            type: 'POST',
            url: '../Examination.asmx/getExams1',
            data: '{}',
            contentType: 'application/json;charset=utf-8',
            dataType: 'xml',
            success: function (result) {
                process(result);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
                $('#ExamMain').css('visibility', 'hidden');
                $("#Modes").fadeIn('slow');
            }
        });
    }
    function GetQuestions2() {
        $.ajax({
            type: 'POST',
            url: '../Examination.asmx/getExams2',
            data: '{}',
            contentType: 'application/json;charset=utf-8',
            dataType: 'xml',
            success: function (result1) {
                process1(result1);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Insufficicent Question for specified subject examination");
                $('#ExamMain').css('visibility', 'hidden');
                $("#Modes").fadeIn('slow');
            }
        });
    }
    function GetQuestions3() {
        $.ajax({
            type: 'POST',
            url: '../Examination.asmx/getExams3',
            data: '{}',
            contentType: 'application/json;charset=utf-8',
            dataType: 'xml',
            success: function (result2) {
                process2(result2);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Insufficicent Question for specified subject examination");
                $('#ExamMain').css('visibility', 'hidden');
                $("#Modes").fadeIn('slow');
            }
        });
    }
    function GetQuestions4() {
        $.ajax({
            type: 'POST',
            url: '../Examination.asmx/getExams4',
            data: '{}',
            contentType: 'application/json;charset=utf-8',
            dataType: 'xml',
            success: function (result) {
                process3(result);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Insufficicent Question for specified subject examination");
                $('#ExamMain').css('visibility', 'hidden');
                $("#Modes").fadeIn('slow');
            }
        });
    }

    $('#btnSubmitQuest').click(function () {

        SubmitAnswer();
    });
    var quests;
    
    $('#Option1').click(function () {
        picked = test.serializeToString(document.getElementById("Option1").nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;
    });
    $('#Option2').click(function () {
        picked = test.serializeToString(document.getElementById("Option2").nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;
    });
    $('#Option3').click(function () {

        picked = test.serializeToString(document.getElementById("Option3").nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;
    });
    $('#Option4').click(function () {

        picked = test.serializeToString(document.getElementById("Option4").nextElementSibling.firstChild);
        mark(picked);
        var cco = tope - checkPicked();
        document.getElementById("tools").innerHTML = "Answered " + cco + " of " + tope;
    });

    $('#Option11').click(function () {
        picked1 = test1.serializeToString(document.getElementById("Option11").nextElementSibling.firstChild);
      
        mark1(picked1);
        var cco = tope1 - checkPicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco + " of " + tope1;
    });
    $('#Option12').click(function () {
        picked1 = test1.serializeToString(document.getElementById("Option12").nextElementSibling.firstChild);
        mark1(picked1);
        var cco = tope1 - checkPicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco + " of " + tope1;
    });
    $('#Option13').click(function () {

        picked1 = test1.serializeToString(document.getElementById("Option13").nextElementSibling.firstChild);
        mark1(picked1);
        var cco = tope1 - checkPicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco + " of " + tope1;
    });
    $('#Option14').click(function () {

        picked1 = test.serializeToString(document.getElementById("Option14").nextElementSibling.firstChild);
        mark1(picked1);
        var cco = tope1 - checkPicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco + " of " + tope1;
    });

    $('#Option21').click(function () {
        picked2 = test1.serializeToString(document.getElementById("Option21").nextElementSibling.firstChild);
        
        mark2(picked2);
        var cco = tope2 - checkPicked2();
        document.getElementById("tools2").innerHTML = "Answered " + cco + " of " + tope2;
        
    });
    $('#Option22').click(function () {
        picked2 = test1.serializeToString(document.getElementById("Option22").nextElementSibling.firstChild);
        mark2(picked2);
        var cco = tope2 - checkPicked2();
        document.getElementById("tools2").innerHTML = "Answered " + cco + " of " + tope2;
    });
    $('#Option23').click(function () {

        picked2 = test1.serializeToString(document.getElementById("Option23").nextElementSibling.firstChild);
        mark2(picked2);
        var cco = tope2 - checkPicked2();
        document.getElementById("tools2").innerHTML = "Answered " + cco + " of " + tope2;
    });
    $('#Option24').click(function () {

        picked2 = test.serializeToString(document.getElementById("Option24").nextElementSibling.firstChild);
        mark2(picked2);
        var cco = tope2 - checkPicked2();
        document.getElementById("tools2").innerHTML = "Answered " + cco + " of " + tope2;
    });

    $('#Option31').click(function () {
        picked3 = test1.serializeToString(document.getElementById("Option31").nextElementSibling.firstChild);
        
        mark3(picked3);
        var cco = tope3 - checkPicked3();
        document.getElementById("tools3").innerHTML = "Answered " + cco + " of " + tope3;

    });
    $('#Option32').click(function () {
        picked3 = test1.serializeToString(document.getElementById("Option32").nextElementSibling.firstChild);
        mark3(picked3);
        var cco = tope3 - checkPicked3();
        document.getElementById("tools3").innerHTML = "Answered " + cco + " of " + tope3;
    });
    $('#Option33').click(function () {
        picked3 = test1.serializeToString(document.getElementById("Option33").nextElementSibling.firstChild);
        mark3(picked3);
        var cco = tope3 - checkPicked3();
        document.getElementById("tools3").innerHTML = "Answered " + cco + " of " + tope3;
    });
    $('#Option34').click(function () {
        picked3 = test1.serializeToString(document.getElementById("Option34").nextElementSibling.firstChild);
        mark3(picked3);
        var cco = tope3 - checkPicked3();
        document.getElementById("tools3").innerHTML = "Answered " + cco + " of " + tope3;
    });

    $('#back').click(function () {
        if (questno == 0) {

            questno = tope - 1;

        } else {
            questno--;
        }
        checkedAnswered();
        //    deactivate();
        document.getElementById("Quest").innerHTML = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[0].firstChild);
        var optA = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[1].firstChild);
        var optB = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[2].firstChild);
        var optC = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[3].firstChild);
        var optD = test.serializeToString(doc.firstChild.childNodes[questno].childNodes[4].firstChild);

        document.getElementById("lblOpt1").innerHTML = optA;
        document.getElementById("lblOpt2").innerHTML = optB;
        document.getElementById("lblOpt3").innerHTML = optC;
        document.getElementById("lblOpt4").innerHTML = optD;

        if (posi == optA) {
            getcontrolposition(1);
        }
        else if (posi == optB) {
            getcontrolposition(2);
        }
        else if (posi == optC) {
            getcontrolposition(3);
        }
        else if (posi == optD) {
            getcontrolposition(4);
        }
        var telly = questno + 1;
        document.getElementById("QuestNo").innerHTML = telly;
    });
    $('#forward').click(function () {
        if (questno == (tope - 1)) {

            questno = 0;
        } else {

            questno++;
        }
        //    deactivate();
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
        }
        else if (posi == optBi) {
            getcontrolposition(2);
        }
        else if (posi == optCi) {
            getcontrolposition(3);
        }
        else if (posi == optDi) {
            getcontrolposition(4);
        }
        var telly = questno + 1;
        document.getElementById("QuestNo").innerHTML = telly;
    });

    $('#back1').click(function () {
    
         if (questno1 == 0) {

            questno1 = tope1 - 1;
        //    alert('back');
        } else {
            questno1--;
        }
        checkedAnswered1();
        //    deactivate();

         document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[0].firstChild);

         var optA = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[1].firstChild);
         var optB = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[2].firstChild);
         var optC = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[3].firstChild);
         var optD = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[4].firstChild);

         document.getElementById("lblOpt11").innerHTML = optA;
         document.getElementById("lblOpt12").innerHTML = optB;
         document.getElementById("lblOpt13").innerHTML = optC;
         document.getElementById("lblOpt14").innerHTML = optD;

         if (posi1 == optA) {
             getcontrolposition1(1);
         }
         else if (posi1 == optB) {
             getcontrolposition1(2);
         }
         else if (posi1 == optC) {
             getcontrolposition1(3);
         }
         else if (posi1 == optD) {
             getcontrolposition1(4);
         }
         var telly = questno1 + 1;
         document.getElementById("QuestNo1").innerHTML = telly;
    });
    $('#forward1').click(function () {
        if (questno1 == 0) {

            questno1++;
       
        } else if (questno1 == tope1) {
            questno1 = 0;;
        }
        else {
            questno1++;
        }
        checkedAnswered1();

        //    deactivate();
        document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc1.firstChild.childNodes[questno1].childNodes[4].firstChild);

        document.getElementById("lblOpt11").innerHTML = optA;
        document.getElementById("lblOpt12").innerHTML = optB;
        document.getElementById("lblOpt13").innerHTML = optC;
        document.getElementById("lblOpt14").innerHTML = optD;

        if (posi1 == optA) {
            getcontrolposition1(1);
        }
        else if (posi1 == optB) {
            getcontrolposition1(2);
        }
        else if (posi1 == optC) {
            getcontrolposition1(3);
        }
        else if (posi1 == optD) {
            getcontrolposition1(4);
        }
        var telly = questno1 + 1;
        document.getElementById("QuestNo1").innerHTML = telly;
    });

    $('#back2').click(function () {

        if (questno2 == 0) {

            questno2 = tope2 - 1;
            //    alert('back');
        } else {
            questno2--;
        }
        checkedAnswered2();
        //    deactivate();

        document.getElementById("Quest2").innerHTML = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[4].firstChild);

        document.getElementById("lblOpt21").innerHTML = optA;
        document.getElementById("lblOpt22").innerHTML = optB;
        document.getElementById("lblOpt23").innerHTML = optC;
        document.getElementById("lblOpt24").innerHTML = optD;

        if (posi2 == optA) {
            getcontrolposition2(1);
        }
        else if (posi2 == optB) {
            getcontrolposition2(2);
        }
        else if (posi2 == optC) {
            getcontrolposition2(3);
        }
        else if (posi2 == optD) {
            getcontrolposition2(4);
        }
        var telly = questno2 + 1;
        document.getElementById("QuestNo2").innerHTML = telly;
    });
    $('#forward2').click(function () {
        if (questno2 == 0) {

            questno2++;

        } else if (questno2 == tope2) {
            questno2 = 0;;
        }
        else {
            questno2++;
        }
        checkedAnswered2();

        //    deactivate();
        document.getElementById("Quest2").innerHTML = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc2.firstChild.childNodes[questno2].childNodes[4].firstChild);

        document.getElementById("lblOpt21").innerHTML = optA;
        document.getElementById("lblOpt22").innerHTML = optB;
        document.getElementById("lblOpt23").innerHTML = optC;
        document.getElementById("lblOpt24").innerHTML = optD;

        if (posi2 == optA) {
            getcontrolposition2(1);
        }
        else if (posi2 == optB) {
            getcontrolposition2(2);
        }
        else if (posi2 == optC) {
            getcontrolposition2(3);
        }
        else if (posi2 == optD) {
            getcontrolposition2(4);
        }
        var telly = questno2 + 1;
        document.getElementById("QuestNo2").innerHTML = telly;
    });

    $('#back3').click(function () {

        if (questno3 == 0) {

            questno3 = tope3 - 1;
            //    alert('back');
        } else {
            questno3--;
        }
        checkedAnswered3();
        //    deactivate();

        document.getElementById("Quest3").innerHTML = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[4].firstChild);

        document.getElementById("lblOpt31").innerHTML = optA;
        document.getElementById("lblOpt32").innerHTML = optB;
        document.getElementById("lblOpt33").innerHTML = optC;
        document.getElementById("lblOpt34").innerHTML = optD;

        if (posi3 == optA) {
            getcontrolposition3(1);
        }
        else if (posi3 == optB) {
            getcontrolposition3(2);
        }
        else if (posi3 == optC) {
            getcontrolposition3(3);
        }
        else if (posi3 == optD) {
            getcontrolposition3(4);
        }
        var telly = questno3 + 1;
        document.getElementById("QuestNo3").innerHTML = telly;
    });
    $('#forward3').click(function () {
        if (questno3 == 0) {

            questno3++;

        } else if (questno3 == tope3) {
            questno3 = 0;;
        }
        else {
            questno3++;
        }
        checkedAnswered3();

        //    deactivate();
        document.getElementById("Quest3").innerHTML = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[0].firstChild);

        var optA = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[1].firstChild);
        var optB = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[2].firstChild);
        var optC = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[3].firstChild);
        var optD = test1.serializeToString(doc3.firstChild.childNodes[questno3].childNodes[4].firstChild);

        document.getElementById("lblOpt31").innerHTML = optA;
        document.getElementById("lblOpt32").innerHTML = optB;
        document.getElementById("lblOpt33").innerHTML = optC;
        document.getElementById("lblOpt34").innerHTML = optD;

        if (posi3 == optA) {
            getcontrolposition3(1);
        }
        else if (posi3 == optB) {
            getcontrolposition3(2);
        }
        else if (posi3 == optC) {
            getcontrolposition3(3);
        }
        else if (posi3 == optD) {
            getcontrolposition3(4);
        }
        var telly = questno3 + 1;
        document.getElementById("QuestNo3").innerHTML = telly;
    });

    var xx = 59;
    var min = 10;
    
};

function CallAnswer()
{
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ans',
        data: '{"QuestNo":"' + tope + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function (result) {
          ProcessAnswer(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
        }
    });
}
function CallAnswer1() {
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ans1',
        data: '{"QuestNo":"' + tope1 + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function (result) {
            ProcessAnswer1(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
function CallAnswer2() {
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ans2',
        data: '{"QuestNo":"' + tope2 + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function (result) {
            ProcessAnswer2(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
function CallAnswer3() {
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ans3',
        data: '{"QuestNo":"' + tope3 + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function (result) {
            ProcessAnswer3(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function checkPicked() {
    var not = 0;
    for (var colo = 0; colo < clickey.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
            not++;
        }
    }
    return not;
}
function checkPicked1() {
    var not = 0;
    for (var colo = 0; colo < clickey1.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey1.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
            not++;
        }
    }
    return not;
}
function checkPicked2() {
    var not = 0;
    for (var colo = 0; colo < clickey2.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey2.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
            not++;
        }
    }
    return not;
}
function checkPicked3() {
    var not = 0;
    for (var colo = 0; colo < clickey3.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey3.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
            not++;
        }
    }
    return not;
}


function ProcessAnswer(toUse)
{
    var coo = toUse.firstChild.childNodes.length;
    for (var count = 0; count < coo; count++)
    {
        toUse.firstChild.childNodes[count].childNodes[0].innerHTML = test.serializeToString(doc.firstChild.childNodes[count].childNodes[0].firstChild);
        toUse.firstChild.childNodes[count].childNodes[1].innerHTML = "";
    }

    clickey = toUse;

   // alert(test.serializeToString(toUse));
}
function ProcessAnswer1(toUse1) {
    var coo = toUse1.firstChild.childNodes.length;
    for (var count = 0; count < coo; count++) {
        toUse1.firstChild.childNodes[count].childNodes[0].innerHTML = test.serializeToString(doc1.firstChild.childNodes[count].childNodes[0].firstChild);
        toUse1.firstChild.childNodes[count].childNodes[1].innerHTML = "";
    }

    clickey1 = toUse1;

    // alert(test.serializeToString(toUse));
}
function ProcessAnswer2(toUse2) {
    var coo = toUse2.firstChild.childNodes.length;
    for (var count = 0; count < coo; count++) {
        toUse2.firstChild.childNodes[count].childNodes[0].innerHTML = test.serializeToString(doc2.firstChild.childNodes[count].childNodes[0].firstChild);
        toUse2.firstChild.childNodes[count].childNodes[1].innerHTML = "";
    }
    clickey2 = toUse2;

}
function ProcessAnswer3(toUse2) {
    var coo = toUse2.firstChild.childNodes.length;
    for (var count = 0; count < coo; count++) {
        toUse2.firstChild.childNodes[count].childNodes[0].innerHTML = test.serializeToString(doc3.firstChild.childNodes[count].childNodes[0].firstChild);
        toUse2.firstChild.childNodes[count].childNodes[1].innerHTML = "";
    }
    clickey3 = toUse2;

}

function process(res) {

    var cc = new DOMParser();
    var resp=test.serializeToString(res);
    doc = cc.parseFromString(resp, "text/xml");

    tope = doc.firstChild.childNodes.length;
  //  alert("reached");

    document.getElementById("Quest").firstChild.innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[0].firstChild);

    document.getElementById("lblOpt1").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt2").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt3").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt4").innerHTML = test.serializeToString(doc.firstChild.firstChild.childNodes[4].firstChild);

    CallAnswer();
}
function process1(res1) {

    var cc = new DOMParser();
    var resp1 = test.serializeToString(res1);
    doc1 = cc.parseFromString(resp1, "text/xml");

    tope1 = doc1.firstChild.childNodes.length;
    //  alert("reached");

    document.getElementById("Quest1").firstChild.innerHTML = test.serializeToString(doc1.firstChild.firstChild.childNodes[0].firstChild);

    document.getElementById("lblOpt11").innerHTML = test.serializeToString(doc1.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt12").innerHTML = test.serializeToString(doc1.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt13").innerHTML = test.serializeToString(doc1.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt14").innerHTML = test.serializeToString(doc1.firstChild.firstChild.childNodes[4].firstChild);

    CallAnswer1();
}
function process2(res1) {

    var cc = new DOMParser();
    var resp1 = test.serializeToString(res1);
    doc2 = cc.parseFromString(resp1, "text/xml");

    tope2 = doc2.firstChild.childNodes.length;

    document.getElementById("Quest2").firstChild.innerHTML = test.serializeToString(doc2.firstChild.firstChild.childNodes[0].firstChild);

    document.getElementById("lblOpt21").innerHTML = test.serializeToString(doc2.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt22").innerHTML = test.serializeToString(doc2.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt23").innerHTML = test.serializeToString(doc2.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt24").innerHTML = test.serializeToString(doc2.firstChild.firstChild.childNodes[4].firstChild);

    CallAnswer2();
}
function process3(res1) {

    var cc = new DOMParser();
    var resp1 = test.serializeToString(res1);
    doc3 = cc.parseFromString(resp1, "text/xml");
  //  alert(doc3);
    tope3 = doc3.firstChild.childNodes.length;

    document.getElementById("Quest3").firstChild.innerHTML = test.serializeToString(doc3.firstChild.firstChild.childNodes[0].firstChild);

    document.getElementById("lblOpt31").innerHTML = test.serializeToString(doc3.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt32").innerHTML = test.serializeToString(doc3.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt33").innerHTML = test.serializeToString(doc3.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt34").innerHTML = test.serializeToString(doc3.firstChild.firstChild.childNodes[4].firstChild);

    CallAnswer3();
}

function GetExamTime(SubjectCodes)
{
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ExamTime',
        data: '{"SubjectCode":"' + SubjectCodes + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (result) {
           
            var time = document.getElementById('time');
            xx = 59;
            var timer = JSON.stringify(result);
            min = timer - 1;
           
                setInterval(function () {
                    xx--;
                    if (xx == 0) {
                        if (min == 0 && xx == 0) {
                            xx++;
                            SubmitAnswer();

                        } else {
                            xx = 59;
                            min--;
                        }
                    }

                    time.innerHTML = min.toString() + " : " + xx.toString();

                }, 1000);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          
            alert(thrownError);

        }
    });
}


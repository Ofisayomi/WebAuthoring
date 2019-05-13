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

function deactivate()
{
    $('#Option1').prop('checked', false);
    $('#Option2').prop('checked', false);
    $('#Option3').prop('checked', false);
    $('#Option4').prop('checked', false);
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

function SubmitAnswer()
{
    var coola = ReadAnswer();
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

//window.onbeforeunload = function () { return "Your work will be lost!"; }



window.onload = function () {

    $('#ExamMain').css('visibility', 'hidden');
  
    //   noback();

    $('.SubjectLinks').click(function () {
        alert(this.innerText);
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

    $('#btnStart').click(function () {
        
        $("#Modes").fadeOut('slow');
        $('#ExamMain').css('visibility', 'visible');
        var collects = window.location.search.substr(1).split('&');
        var codey = collects.toString().split('=')[1];
      //  alert(codey);

        selected = codey
        var regNo = test.serializeToString(document.getElementById('jambreg').firstChild);
       
       $.ajax({
           type: 'POST',
           url: '../Examination.asmx/ScriptQuests',
           data: '{"SubjectCode":"' + selected + '","JambRegNo":"'+regNo+'"}',
           contentType: 'application/json;charset=utf-8',
           dataType: 'xml',
           success: function (result) {
               process(result);
              
           },
           error: function (xhr, ajaxOptions, thrownError) {
               alert("Insufficicent Question for specified subject examination");
               $('#ExamMain').css('visibility', 'hidden');
               $("#Modes").fadeIn('slow');
           }
       });
           GetExamTime(selected);
       
    });

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

            if (posi == optA)
            {
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
            var telly= questno + 1;
            document.getElementById("QuestNo").innerHTML = telly;
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

function checkPicked() {
    var not = 0;
    for (var colo = 0; colo < clickey.firstChild.childNodes.length; colo++) {
        if (test.serializeToString(clickey.firstChild.childNodes[colo].childNodes[1]) == "<option/>") {
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

function process(res) {

    var cc = new DOMParser();
    resp=test.serializeToString(res);
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

/////////////////////////##################################################//////////////////////////////////////////////////
/*
var clickey1;
var doc1;
var Questno1 = 0;
var test1 = new XMLSerializer();
var posi1;
var selected1;
var tope1;
var tool1;

function checkedAnswered1() {
    var Quest1ion1e1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[0].firstChild);
    tool1 = 0;
    for (var cou1e1 = 0; cou1e1 < clickey1.firstChild.childNodes.length; cou1e1++) {
        var caoch1e1 = test1.serializeToString(clickey1.firstChild.childNodes[cou1e1].childNodes[0].firstChild);

        if (caoch1e1 == Quest1ion1e1) {
            var ok1 = test1.serializeToString(clickey1.firstChild.childNodes[cou1e1].childNodes[1]);

            if (ok1 == "<option/>") {
                deactivate1();
                tool1++;
            }
            else {
                posi1 = test1.serializeToString(clickey1.firstChild.childNodes[cou1e1].childNodes[1].firstChild);
            }

        }
    }

}

function getcontrolposition1(posi1tion_x) {
    if (posi1tion_x == 1) {
        $('#Option11').prop('checked', true);
        $('#Option12').prop('checked', false);
        $('#Option13').prop('checked', false);
        $('#Option14').prop('checked', false);
    }
    else if (posi1tion_x == 2) {
        $('#Option11').prop('checked', false);
        $('#Option12').prop('checked', true);
        $('#Option13').prop('checked', false);
        $('#Option14').prop('checked', false);
    }
    else if (posi1tion_x == 3) {
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

function mark1(picked1) {
    var Quest1ion1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[0].firstChild);

    for (var cou1 = 0; cou1 < clickey1.firstChild.childNodes.length; cou1++) {
        var caoch1 = test1.serializeToString(clickey1.firstChild.childNodes[cou1].childNodes[0].firstChild);
        if (caoch1 == Quest1ion1) {
            clickey1.firstChild.childNodes[cou1].childNodes[1].innerHTML = picked1;
        }

    }

}

function deactivate1() {
    $('#Option11').prop('checked', false);
    $('#Option12').prop('checked', false);
    $('#Option13').prop('checked', false);
    $('#Option14').prop('checked', false);
}

var test1y = [];

function ReadAnswer1() {
    var Quest1ion1so = '';
    var optionso1 = '';
    var retor1 = '';
    for (var cou1nti = 0; cou1nti < clickey1.firstChild.childNodes.length; cou1nti++) {
        Quest1ion1s = test1.serializeToString(clickey1.firstChild.childNodes[cou1nti].childNodes[0].firstChild);//+'&&&'+;

        if (clickey1.firstChild.childNodes[cou1nti].childNodes[1].firstChild == null) {
            options = '';
        }
        else {
            optionso1 = test1.serializeToString(clickey1.firstChild.childNodes[cou1nti].childNodes[1].firstChild);
        }
        retor1 += '™' + Quest1ion1s + '©' + optionso1;
    }
    return retor1;
}

function SubmitAnswer1() {
    var coola1 = ReadAnswer1();
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/SubmitStatus',
        data: '{"xml":"' + coola1 + '"}',
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
    window.history.forward1();
}

//window.onbeforeunload = function () { return "Your work will be lost!"; }



window.onload = function () {

    $('#ExamMain').css('visibility', 'hidden');

    //   noback();

    $('.Quest1btns1').click(function () {
        var btnnumber1 = this.getAttribute("value");
        Questno1 = btnnumber1 - 1;

        checkedAnswered1();
        //    deactivate1();
        document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[0].firstChild);
        var optA1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[1].firstChild);
        var optB1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[2].firstChild);
        var optC1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[3].firstChild);
        var optD1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[4].firstChild);

        document.getElementById("lblOpt11").innerHTML = optA1;
        document.getElementById("lblOpt12").innerHTML = optB1;
        document.getElementById("lblOpt13").innerHTML = optC1;
        document.getElementById("lblOpt14").innerHTML = optD1;

        if (posi1 == optA1) {
            getcontrolposition1(1);
        }
        else if (posi1 == optB1) {
            getcontrolposition1(2);
        }
        else if (posi1 == optC1) {
            getcontrolposition1(3);
        }
        else if (posi1 == optD1) {
            getcontrolposition1(4);
        }
        var telly1 = Questno1 + 1;
        document.getElementById("Questno1").innerHTML = telly1;


    });

    $('#btnStart').click(function () {

        $("#Modes").fadeOut('slow');
        $('#ExamMain').css('visibility', 'visible');
        var collects1 = window.location.search.substr(1).split('&');
        var codey1 = collects1.toString().split('=')[1];
        //  alert(codey1);

        selected1 = codey1
        var regNo1 = test1.serializeToString(document.getElementById('jambreg').firstChild);

        $.ajax({
            type: 'POST',
            url: '../Examination.asmx/ScriptQuest1s',
            data: '{"SubjectCode":"' + selected1 + '","JambRegNo":"' + regNo1 + '"}',
            contentType: 'application/json;charset=utf-8',
            dataType: 'xml',
            success: function (result) {
                process1(result);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Insufficicent Quest1ion1 for specified subject examination");
                $('#ExamMain').css('visibility', 'hidden');
                $("#Modes").fadeIn('slow');
            }
        });
   //     GetExamTime1(selected1);

    });

    $('#btnSubmitQuest').click(function () {

        SubmitAnswer1();
    });
    var Quest1s;

    $('#Option11').click(function () {
        picked1 = test1.serializeToString(document.getElementById("Option11").nextElementSibling.firstChild);
        mark1(picked1);
        var cco1 = tope1 - checkpicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco1 + " of " + tope1;
    });
    $('#Option12').click(function () {
        picked1 = test1.serializeToString(document.getElementById("Option12").nextElementSibling.firstChild);
        mark1(picked1);
        var cco1 = tope1 - checkpicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco1 + " of " + tope1;
    });
    $('#Option13').click(function () {

        picked1 = test1.serializeToString(document.getElementById("Option13").nextElementSibling.firstChild);
        mark1(picked1);
        var cco1 = tope1 - checkpicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco1 + " of " + tope1;
    });
    $('#Option14').click(function () {

        picked1 = test1.serializeToString(document.getElementById("Option14").nextElementSibling.firstChild);
        mark1(picked1);
        var cco1 = tope1 - checkpicked1();
        document.getElementById("tools1").innerHTML = "Answered " + cco1 + " of " + tope1;
    });

    $('#back1').click(function () {
        if (Questno1 == 0) {

            Questno1 = tope1 - 1;

        } else {
            Questno1--;
        }
        checkedAnswered1();
        //    deactivate1();
        document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[0].firstChild);
        var optA1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[1].firstChild);
        var optB1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[2].firstChild);
        var optC1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[3].firstChild);
        var optD1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[4].firstChild);

        document.getElementById("lblOpt11").innerHTML = optA1;
        document.getElementById("lblOpt12").innerHTML = optB1;
        document.getElementById("lblOpt13").innerHTML = optC1;
        document.getElementById("lblOpt14").innerHTML = optD1;

        if (posi1 == optA1) {
            getcontrolposition1(1);
        }
        else if (posi1 == optB1) {
            getcontrolposition1(2);
        }
        else if (posi1 == optC1) {
            getcontrolposition1(3);
        }
        else if (posi1 == optD1) {
            getcontrolposition1(4);
        }
        var telly1 = Questno1 + 1;
        document.getElementById("Questno1").innerHTML = telly1;
    });
    $('#forward1').click(function () {
        if (Questno1 == (tope1 - 1)) {

            Questno1 = 0;
        } else {

            Questno1++;
        }
        //    deactivate1();
        checkedAnswered1();
        document.getElementById("Quest1").innerHTML = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[0].firstChild);
        var optAi1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[1].firstChild);
        var optBi1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[2].firstChild);
        var optCi1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[3].firstChild);
        var optDi1 = test1.serializeToString(doc1.firstChild.childNodes[Questno1].childNodes[4].firstChild);

        document.getElementById("lblOpt11").innerHTML = optAi1;
        document.getElementById("lblOpt12").innerHTML = optBi1;
        document.getElementById("lblOpt13").innerHTML = optCi1;
        document.getElementById("lblOpt14").innerHTML = optDi1;

        if (posi1 == optAi1) {
            getcontrolposition1(1);
        }
        else if (posi1 == optBi1) {
            getcontrolposition1(2);
        }
        else if (posi1 == optCi1) {
            getcontrolposition1(3);
        }
        else if (posi1 == optDi1) {
            getcontrolposition1(4);
        }
        var telly1 = Questno1 + 1;
        document.getElementById("Questno1").innerHTML = telly1;
    });


    var xx = 59;
    var min = 10;

};

function CallAnswer1() {
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ans',
        data: '{"Questno1":"' + tope1 + '"}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function (result) {
            ProcessAnswer1(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function checkpicked1() {
    var not1 = 0;
    for (var colo1 = 0; colo1 < clickey1.firstChild.childNodes.length; colo1++) {
        if (test1.serializeToString(clickey1.firstChild.childNodes[colo1].childNodes[1]) == "<option/>") {
            not1++;
        }
    }
    return not1;
}

function ProcessAnswer1(toUse1) {
    var coo1 = toUse1.firstChild.childNodes.length;
    for (var count1 = 0; count1 < coo1; count1++) {
        toUse1.firstChild.childNodes[count1].childNodes[0].innerHTML = test1.serializeToString(doc1.firstChild.childNodes[count1].childNodes[0].firstChild);
        toUse1.firstChild.childNodes[count1].childNodes[1].innerHTML = "";
    }

    clickey1 = toUse1;

    // alert(test1.serializeToString(toUse1));
}

function process1(res1) {

    var cc1 = new DOMParser();
    resp1 = test1.serializeToString(res1);
    doc1 = cc1.parseFromString(resp1, "text/xml");

    tope1 = doc1.firstChild.childNodes.length;
    //  alert("reached");

    document.getElementById("Quest1").firstChild.innerHTML = test1.serializeToString(doc1.firstChild.firstChild.childNodes[0].firstChild);
    document.getElementById("lblOpt11").innerHTML = test1.serializeToString(doc1.firstChild.firstChild.childNodes[1].firstChild);
    document.getElementById("lblOpt12").innerHTML = test1.serializeToString(doc1.firstChild.firstChild.childNodes[2].firstChild);
    document.getElementById("lblOpt13").innerHTML = test1.serializeToString(doc1.firstChild.firstChild.childNodes[3].firstChild);
    document.getElementById("lblOpt14").innerHTML = test1.serializeToString(doc1.firstChild.firstChild.childNodes[4].firstChild);

    CallAnswer1();
}

function GetExamTime1(SubjectCodes1) {
    $.ajax({
        type: 'POST',
        url: '../Examination.asmx/ExamTime',
        data: '{"SubjectCode":"' + SubjectCodes1 + '"}',
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
                        SubmitAnswer1();

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

*/

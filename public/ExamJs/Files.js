/// <reference path="jquery-1.8.2.js" />

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ContentPlaceHolder1_browsed').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

window.onload = function () {
    $('#QuestionModes').css("visibility", "hidden");

    $('#SelectSubjectCode').click(function () {
        $('#QuestionModes').css("visibility", "visible");
        $('#QuestionMain').css('visibility', 'hidden');
    });

    $('#btnStart').click(function () {
        $('#QuestionModes').css("visibility", "hidden");
        $('#QuestionMain').css('visibility', 'visible');
    });

    $('#close').click(function () {
        $('#QuestionModes').css("visibility", "hidden");
        $('#QuestionMain').css('visibility', 'visible');
    });

    
    
}

window.onloadstart = function () {
    var col = document.getElementsByTagName("img");;
    var vo = $('img').last();
    vo.attr('src', '../UsersPic/13.jpg');
}
/// <reference path="jquery-1.8.2.js" />

window.onload = function() {
    $.ajax({
        type: 'POST',
        url: '/actions/questions',
        data: '{}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'xml',
        success: function(result) {
            alert(result.toString());

        },
        error: function(xhr, ajaxOptions, thrownError) {
            //  alert(xhr.responseText);
        }
    });

    var min = 9;
    var xx = 59;
    var time = document.getElementById("time");
    setInterval(function() {
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
    var buttons = "";
    for (var c = 0; c < 40; c++) {
        d = c + 1;
        buttons += '<input type="button" value="' + d + '"/>';
    }

    //var co = document.getElementById("buttoncontainer");
    //co.innerHTML = buttons;
    $('#buttoncontainer1, #buttoncontainer2, #buttoncontainer3, #buttoncontainer4').html(buttons);

    $('input[name=radioset-2]').click(function() {
        // alert($(this).val());
    });

    $('#buttoncontainer1 input').click(function() {
        alert($(this).val());
    });

    $('#buttoncontainer2 input').click(function() {
        alert($(this).val());
    });

    $('#buttoncontainer3 input').click(function() {
        alert($(this).val());
    });

    $('#buttoncontainer4 input').click(function() {
        alert($(this).val());
    });
}
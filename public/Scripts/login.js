/// <reference path="jquery-1.8.2.js" />

window.onload = function() {

    var url = new URL(window.location.href);
    var userId = url.searchParams.get('Id');

    $("#btnLogin").click(function() {
        var password = $("#txtPassword").val();
        var username = $("#txtUsername").val();

        if (password == "" || username == "") {
            alert("Invalid login parameter supplied...")
        } else {

            $.ajax({
                type: 'POST',
                url: '/actions/login',
                data: { username: username, password: password },
                //         contentType: 'application/json;charset=utf-8',
                dataType: 'JSON',
                success: function(result) {
                    if (result == "") {
                        alert('Invalid Login parameters supplied');
                    } else {
                        $(location).attr('href', result + '?Id=' + username);
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    $(location).attr('href', xhr.responseText + '?Id=' + username);
                }
            });
            //    
        }
    });

    $.ajax({
        type: 'POST',
        url: '/actions/ExamSubjectCode',
        data: '{}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',
        success: function(result) {
            var texts = "";
            for (var c = 0; c < result.length; c++) {
                texts += '<a href="/Exam.html?code=' + result[c].code + '&&Id=' + userId + '">' + result[c].code + '</a><br>';
            }
            $('#ExamCodes').html(texts);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });

}
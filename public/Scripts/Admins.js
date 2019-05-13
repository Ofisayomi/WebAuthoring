/// <reference path="jquery-1.8.2.js" />
var filo;
window.onload = function() {

    $('#btnSubmit').click(function() {
        if ($('#txtName').val().trim() == '' || $('#txtJambRegNo').val().trim() == '' || $('#txtPassword').val().trim() == '' || $('#filepic').val().trim() == '') {
            alert('All required fields are not supplied');
        } else if ($('#txtPassword').val().trim() != $('#txtConfirmPassword').val().trim()) {
            alert('Password Confirmation failed');
            $('#txtConfirmPassword').val('');
        } else if (filo == undefined) {
            alert('Candidate Picture required');
        } else {
            var info = { Name: $('#txtName').val(), RegNo: $('#txtJambRegNo').val(), Password: $('#txtPassword').val(), Picture: filo }
            $.ajax({
                type: 'POST',
                url: '/actions/Registration',
                data: info,
                //   contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    alert('Successful...');
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                }

            })
            $('#txtName').val('');
            $('#txtJambRegNo').val('');
            $('#txtPassword').val('');
            $('#txtConfirmPassword').val('');
        }
    });

    $('#btnSubmitSubject').click(() => {
        if ($('#txtSubjectDescr').val().trim() == '' || $('#txtSubjectCode').val().trim() == '') {
            alert('Required fields not supplied');
        } else {
            var info = { Code: $('#txtSubjectCode').val(), Description: $('#txtSubjectDescr').val() }
            $.ajax({
                type: 'POST',
                url: '/actions/AddSubject',
                data: info,
                dataType: 'json',
                success: function(result) {
                    alert(result);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                }

            })
            $('#txtSubjectCode').val('');
        }
    });

    $('#btnSubmitExamConfig').click(() => {
        if ($('#txtQuestNo').val().trim() == '' || $('#txtTime').val().trim() == '') {
            alert('Required fields not supplied');
        } else {
            var info = { Code: $('#SubCodes').val(), Duration: $('#txtTime').val(), QuestNo: $('#txtQuestNo').val() }
            $.ajax({
                type: 'POST',
                url: '/actions/UpdateExam',
                data: info,
                dataType: 'json',
                success: function(result) {
                    alert(result);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                }

            })
            $('#txtQuestNo').val('');
            $('#txtTime').val('');
        }
    });

    $.ajax({
        type: 'POST',
        url: '/actions/ExamSubjectCode',
        data: '{}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(result) {
            var opts = "";
            for (var c = 0; c < result.length; c++) {
                opts += "<option>" + result[c].code + "</option>";
            }
            //  alert(opts);
            $('#SubCodes').html(opts);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#ImgMemberPic').attr('src', e.target.result);
            filo = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
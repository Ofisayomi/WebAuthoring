/// <reference path="jquery-1.8.2.js" />

window.onload = function() {

    $('#btnUploadQuest').click(function() {
        if ($('#SubjectCodes').val() == '--Select Subject--') {
            alert('No valid subject code selected');
        } else if ($('#UpQuest').val() == "" || $('#UpEditor1').val() == "" || $('#UpEditor2').val() == "" || $('#UpEditor3').val() == "" || $('#UpEditor4').val() == "") {
            alert('Required fields not supplied');
        } else {
            var data = {
                description: $('#UpQuest').val(),
                Instruction: $('#UpInstruct').val(),
                SubjectCode: $('#SubjectCodes').val(),
                Options: [
                    [$('#UpEditor1').val(), $('#radio-1:checked').length.toString()],
                    [$('#UpEditor2').val(), $('#radio-2:checked').length.toString()],
                    [$('#UpEditor3').val(), $('#radio-3:checked').length.toString()],
                    [$('#UpEditor4').val(), $('#radio-4:checked').length.toString()]
                ]
            }
            $.ajax({
                type: 'POST',
                url: '/actions/UploadQuest',
                data: data,
                //contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    alert(result);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                }
            });
        }


        //   data = JSON.parse(data);


        $('#UpQuest').val("");
        $('#UpEditor1').val("");
        $('#UpEditor2').val("");
        $('#UpEditor3').val("");
        $('#UpEditor4').val("");
    });

    $('#SubjectCodes').change(function() {
        $.ajax({
            type: 'POST',
            url: '/actions/CountQuestions',
            data: { Code: $(this).val() },
            //    contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function(result) {
                Update(result);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            }
        });
    });

    $.ajax({
        type: 'POST',
        url: '/actions/Subjects',
        data: '{}',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(result) {
            var opts = "<option>--Select Subject--</option>";
            for (var c = 0; c < result.length; c++) {
                opts += "<option>" + result[c].code + "</option>";
            }
            //  alert(opts);
            $('#SubjectCodes').html(opts);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });

    $('#lnkUploadQuest').click(() => {
        $(location).attr('href', 'Editor.html');
    });
    $('#lnkAddSubject').click(() => {
        $(location).attr('href', 'SubjectConfig.html');
    });
    $('#lnkConfigExam').click(() => {
        $(location).attr('href', 'Config.html');
    });
    $('#lnkExams').click(() => {
        $(location).attr('href', '/Examinations');
    })
    $('#lnkRegCandidate').click(() => {
        $(location).attr('href', 'Register');
    });
    $('#lnkResults').click(() => {
        $(location).attr('href', '/Result');
    });
    $('#lnkStudents').click(() => {
        $(location).attr('href', '/Students');
    })
    $('#lnkAbout').click(() => {
        $(location).attr('href', '#');
    })
}

function Update(Count) {
    $('#QuestCount').html('Sum of Uploaded questions for ' + $('#SubjectCodes').val() + ' is ' + Count);
}

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#ImgMemberPic').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
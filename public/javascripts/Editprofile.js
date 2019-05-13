function Update(value, status) {
    $.ajax({
        type: "POST",
        url: "/Tutor/Update",
        data: { data: value, status: status },
        dataType: "JSON",
        success: function(response) {

        },
        error: function(response) {

        }
    });
}

function Keydown(e, status, id) {
    if (e.keyCode == 13) {
        if ($(id).val() == '') {
            $(id).parent().find('.notify').css('visibility', 'hidden');
        } else {
            Update($(id).val(), status);
            $(id).parent().find('.notify').css('visibility', 'visible');
            $(id).val('');
        }
    }
}

function Blur(status, id) {
    if ($(id).val() == '') {
        $(id).parent().find('.notify').css('visibility', 'hidden');
    } else {
        Update($(id).val(), status);
        $(id).parent().find('.notify').css('visibility', 'visible');
        $(id).val('');
    }
}

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var filename = input.files[0].name;
            $('#ImgUser').attr('src', e.target.result);
            var filecontent = e.target.result.split(',')[1];
            if (input.files[0].type == 'image/jpeg') {
                $('#ImgInfo').attr('src', '/images/icon-check.svg');
                $.ajax({
                    type: "POST",
                    url: "/Tutor/Updatepic",
                    data: { filecontent: filecontent, filename: filename },
                    dataType: "JSON",
                    success: function(response) {
                        alert(response);
                    }
                });
            } else {
                $('#ImgInfo').attr('src', '/images/error.png');
                $('#ImgInfo').parent().css('visibility', 'visible');
                $('#info').wrapInner("* only jpeg image file type is accepted");
            }
        }
        reader.readAsDataURL(input.files[0]);

    }
}

$(document).ready(function() {

    $('#txtFirstName').blur(function() {
        Blur(1, '#txtFirstName');
    });

    $('#txtFirstName').on('keydown', function(e) {
        Keydown(e, 1, '#txtFirstName');
    });

    $('#txtSurname').blur(function() {
        Blur(2, '#txtSurname');
    });

    $('#txtSurname').on('keydown', function(e) {
        Keydown(e, 2, '#txtSurname');
    });

    $('#txtOthername').blur(function() {
        Blur(3, '#txtOthername');
    });

    $('#txtOthername').on('keydown', function(e) {
        Keydown(e, 3, '#txtOthername');
    });

    $('#txtPhoneNo').blur(function() {

        Blur(4, '#txtPhoneNo');
    });

    $('#txtPhoneNo').on('keydown', function(e) {
        Keydown(e, 4, '#txtPhoneNo');
    });

    $('#drpGender').blur(function() {
        Blur(5, '#drpGender');
    });

    $('#drpGender').on('keydown', function(e) {
        Keydown(e, 5, '#drpGender');
    });

    $('#txtDOB').blur(function() {
        Blur(6, '#txtDOB');
    });

    $('#txtDOB').on('keydown', function(e) {
        Keydown(e, 6, '#txtDOB');
    });

    $('#txtCity').blur(function() {

        Blur(7, '#txtCity');
    });

    $('#txtCity').on('keydown', function(e) {
        Keydown(e, 7, '#txtCity');
    });

    $('#txtState').blur(function() {

        Blur(8, '#txtState');
    });

    $('#txtState').on('keydown', function(e) {
        Keydown(e, 8, '#txtState');
    });

    $('#drpCountry').blur(function() {

        Blur(9, '#drpCountry');
    });

    $('#drpCountry').on('keydown', function(e) {
        Keydown(e, 9, '#drpCountry');
    });
});
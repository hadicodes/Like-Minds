console.log('login file opened');

var login = $('.username').text;
var pw = $('.password').text;

$('#loading-image').css('display', '""');

$('.sign-in').click(function() {
    console.log('sign-in button pressed');
    $.ajax({
            method: "POST",
            url: "/login",
            data: {
                username: login,
                password: pw
            }
        })
        .done(function() {
            $('#loading-image').css('display', 'none');
        });
    $('#sign-in-modal').show();
});

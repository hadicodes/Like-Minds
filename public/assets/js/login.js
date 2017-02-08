console.log('login file opened');

var login = $('.username').text;
var pw = $('.password').text;
var $modalAnimateTime = 300;
$(document).ready(function() {
    $('.sign-in').click(function() {
        console.log('sign-in button pressed');
        $('#sign-in-modal').modal('show');
        $('#lost-form').modal('hide');
        $('#register-form').modal('hide');
        $('#login-form').modal('show');
        $.ajax({
                method: 'POST',
                url: '/login',
                data: {
                    username: login,
                    password: pw
                }
            })
            .done(function() {
                console.log('returned');
            });
    });
    $('.login_login_btn').click(function() {
        $('#lost-form').modal('hide');

        $('#register-form').modal('hide');

        $('#login-form').modal('show');
    });
    $('.login_lost_btn').click(function() {
        $('#login-form').modal('hide');

        $('#register-form').modal('hide');

        $('#lost-form').modal('show');
    });
    $('.login_register_btn').click(function() {
        $('#lost-form').modal('hide');

        $('#login-form').modal('hide');

        $('#register-form').modal('show');
    });
});

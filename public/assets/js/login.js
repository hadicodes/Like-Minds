console.log('login file opened');

var login = $('.username').text;
var pw = $('.password').text;


$(document).ready(function () {
    $('.sign-in').click(function () {
        console.log('sign-in button pressed');
        $('#sign-in-modal').modal('show');
        $('#lost-form').modal('hide');
        $('#register-form').modal('hide');
        $('#login-form').modal('show');

    });

    $('.login_login_btn').click(function (event) {

        event.preventDefault();

        $('#lost-form').modal('hide');

        $('#register-form').modal('hide');

        $('#login-form').modal('show');

        var username = $('#login_username').val().trim();
        var password = $('#login_password').val().trim();

        var loginInfo = {
            username: username,
            password: password
        };

        loginUser(loginInfo);

        function loginUser(loginInfo) {
            $.post("/login", loginInfo, function (user) {
                window.location.href = "/forum";
            }).fail(function (err) {
                alert('Invalid username or password');
            });
        }
    });

    $('.login_lost_btn').click(function () {
        $('#login-form').modal('hide');

        $('#register-form').modal('hide');

        $('#lost-form').modal('show');
    });

    $('.login_register_btn').click(function () {
        $('#lost-form').modal('hide');

        $('#login-form').modal('hide');

        $('#register-form').modal('show');
    });


    $('.register_register_btn').click(function (e) {
        e.preventDefault();
        // $('#lost-form').modal('hide');

        // $('#login-form').modal('hide');

        // $('#register-form').modal('show');

        var username = $('#register_username').val().trim();
        var email = $('#register_email').val().trim();
        var password = $('#register_password').val().trim();
        var location = $('#register_location').val().trim();
        var interests = $('#register_interests').val().trim();

        var registerInfo = {
            username: username,
            password: password,
            email: email,
            location: location,
            interests: interests
        };

        registerUser(registerInfo);

        function registerUser(info) {
            console.log("REGISTER " + info);
            $.post("/register", info, function () {
                window.location.href = "/forum";
            });
        }
    });

    $('.close').on('click', function () {
        $('.modal-backdrop').hide();
    });
    $('.login_login_btn').click(function () {

    });
    $('btn-block').click(function () {

    });
});
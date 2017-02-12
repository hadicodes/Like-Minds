//set the login and pw as global variables
var login = $('.username').text;
var pw = $('.password').text;

//load the document
$(document).ready(function () {
    //on click of the sign in button, load the login in modal and hide the lost and register forms
    $('.sign-in').click(function () {
        $('#sign-in-modal').modal('show');
        $('#lost-form').modal('hide');
        $('#register-form').modal('hide');
        $('#login-form').modal('show');
    });

    //on click of the login in button, load the login in form and hide the lost and register forms
    $('.login_login_btn').click(function (event) {

        event.preventDefault();

        $('#lost-form').modal('hide');

        $('#register-form').modal('hide');

        $('#login-form').modal('show');

        //take the value of the username and password and store
        var username = $('#login_username').val().trim();
        var password = $('#login_password').val().trim();

        var loginInfo = {
            username: username,
            password: password
        };

        loginUser(loginInfo);

        function loginUser(Post) {
            $.post("/login", Post, function (user) {
                console.log('FIRING' + user);
                window.location.href = "/forum";
            }).fail(function (err) {
                alert('Invalid username or password');
            });
        }
    });

    //on click of the lost password button, hide the login and register form and show the lost form
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

    //on click of the register button, capture the values of the login information
    $('.register_register_btn').click(function (e) {
        e.preventDefault();
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
            $.post("/register", info, function (res) {
                if (!res) {
                    alert("Username is taken! Try a different username");
                } else if (res.username === info.username) {
                    console.log("YES USER");
                    window.location.href = "/forum";
                } else {
                    window.location.href = "/login";
                }

            });
        }
    });

    //on click of the close button, hide the modal
    $('.close').on('click', function () {
        $('.modal-backdrop').hide();
    });
    $('.login_login_btn').click(function () {

    });
    $('btn-block').click(function () {

    });
});
//on click of the submit button, capture the values from user input
$('.submit-button').click(function(e) {
    e.preventDefault();
    var topic = $('.topic').val().trim();
    var author = $('.author').val().trim();
    var threadTitle = $('.thread-title').val().trim();
    var newThread = {
        threadTitle: threadTitle,
        topic: topic,
        author: author,
    };
    //post to the threads page
    $.post("/threads", newThread, function(res) {
        var currentURL = window.location.origin;
        window.location.href = (currentURL + '/forum/' + topic);
    });
});

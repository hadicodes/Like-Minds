$(document).ready(function() {
    function getPosts(category) {
        $.get("/api/posts/", function(data) {
            posts = data;
            $(".post-container").html(data);
        });
    }

    $(document).on('click', '.add-new-post', addNewPost);

    //add a thread to the thread table
    function addNewPost(e) {
        e.preventDefault();
        var postInput = $('#new-post').val().trim();
        var authorInput = $('#new-name').val().trim();
        var topicInput = $('#new-topic').val().trim();
        var newPost = {
            post: postInput,
            topic: topicInput,
            author: authorInput,
        };
        $('.post-container').append(postInput + '\n');

        $.ajax({
            type: 'POST',
            url: '/forum/:topic/:thread_title',
            data: newPost
        });

    }
});

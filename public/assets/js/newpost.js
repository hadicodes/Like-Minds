$(document).ready(function() {
    // getPosts();

    function getPosts(category) {
        $.get("/api/posts/", function(data) {
            // console.log("Posts", data);
            posts = data;
            $(".post-container").html(data);
        });
    }

    $(document).on('click', '.add-new-post', addNewPost);

    function addNewPost(e) {
        e.preventDefault();
        console.log("pressed add new post");
        var postInput = $('#new-post').val().trim();
        var authorInput = $('#new-name').val().trim();
        var topicInput = $('#new-topic').val().trim();
        var newPost = {
            post: postInput,
            topic: topicInput,
            author: authorInput,
        };
        $('.post-container').append(postInput + '\n');
        //  console.log(newPost);
        //$.post("/newpost", newPost, function() {});
        $.ajax({
            type: 'POST',
            url: '/forum/:topic/:thread_title',
            data: newPost
        });

    }
});

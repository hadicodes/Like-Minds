$(document).ready(function () {
    getPosts();

    function getPosts(category) {
        $.get("/api/posts/", function (data) {
            // console.log("Posts", data);
            posts = data;
            $(".post-container").html(data);
        });
    }

    $(document).on('click', '.add-new-thread', addNewPost);

    function addNewPost(e) {
        e.preventDefault();
        var postInput = $('#new-post').val().trim();
        var newPost = {
            post: postInput
                // topic: topic,
                // author: author
        };
        console.log(newPost);
        $.post("/newpost", newPost, function () {});
    }
});
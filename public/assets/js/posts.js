$(document).ready(function() {
    /* global moment */
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");


    // This function grabs posts from the database and updates the view
    function getPosts(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/posts" + categoryString, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/posts/" + id
            })
            .done(function() {
                getPosts(postCategorySelect.val());
            });
    }

    // Getting the initial list of posts
    // getPosts();
    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer
    function initializeRows() {
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        blogContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default");
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostCategory = $("<h5>");
        newPostCategory.text(post.category);
        newPostCategory.css({
            float: "right",
            "font-weight": "700",
            "margin-top": "-15px"
        });
        var newPostPanelBody = $("<div>");
        newPostPanelBody.addClass("panel-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostPanelHeading.append(deleteBtn);
        newPostPanelHeading.append(editBtn);
        newPostPanelHeading.append(newPostTitle);
        newPostPanelHeading.append(newPostCategory);
        newPostPanelBody.append(newPostBody);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.append(newPostPanelBody);
        newPostPanel.data("post", post);
        return newPostPanel;
    }

    $(document).on('click', '.add-new-thread', addNewThread);

    function addNewThread(e) {
        e.preventDefault();
        console.log("pressed add new thread");
        var threadTitle = $('.thread-title').val().trim();
        var threadTopic = $('.thread-topic').val().trim();
        var threadAuthor = $('.thread-author').val().trim();
        var threadMessage = $('.thread-message').val().trim();
        var addNewThread = {
            title: threadTitle,
            topic: threadTopic,
            author: threadAuthor,
            message: threadMessage
        };
        $('.post-container').append(postInput + '\n');
        $.ajax({
            type: 'POST',
            url: '/forum/:topic/:thread_title',
            data: newPost
        });
    }
});

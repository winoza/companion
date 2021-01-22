const user = []

$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        const userId = data.id 
        user.push(userId)
      });
  });

$(function (){

    
    $("#add-btn").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var file = $("#post-image").val()
        var splitFile = file.split(`\\`)
        var image = splitFile[splitFile.length - 1]
        var split = image.split('.')
        console.log(image)
        console.log(split[1])
        var newPost = {
          caption: $("#caption").val().trim(),
          preview: `./images/${image}`,
          thumbnail: `./images/${split[0]}_thumb.${split[1]}`,
          UserId: user[0]
        };
    
        // Send the POST request.
        $.when($.ajax("/api/posts", {
          type: "POST",
          data: newPost
        }), $.ajax("/upload", {
            type: "POST",
            data: file
          }))
            .then(function() {

                console.log(newPost);
                // Redirect to member page.
                // window.location.href = "/members";
                location.reload();
          }
        );
      });
    });

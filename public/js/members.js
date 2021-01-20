$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data)
    const username = data.displayName
    $(".member-name").text(username);
  });
});

$(function (){
  $("#add-btn").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var image = $("#image")
      // var image = file.split('/')
      var split = image.split('.')
      console.log(image)
      console.log(split[1])
      var newPost = {
        caption: $("#caption").val().trim(),
        preview: `./images/${image}`,
        thumbnail: `./images/${split[0]}_thumb.${split[1]}`
      };
  
      // Send the POST request.
      $.ajax("/api/posts", {
        type: "POST",
        data: newPost
      }).then(
        function() {
          console.log(newPost);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });

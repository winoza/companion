// $(document).ready(() => {

//   console.log("==========================>data..." + data)
//   getimages();

//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(data => {
//     console.log(data)
//     const username = data.displayName
//     $(".member-name").text(username);
//   });

//   function getimages() {
//     $.get("/api/image", function (data) {
//       console.log("==========================>data..." + data)
//       if (data.length !== 0) {
//         for (var i = 0; i < data.length; i++) {
//           var row = $("<div>");
//           row.addClass("images");
  
//           row.append("<p>" + data[i].name + "</p>");
//           row.append("<p>" + data[i].data + "</p>");
          
  
//           $("#image-area").prepend(row);
//         }
//         }
//       });
//   }
 

// });



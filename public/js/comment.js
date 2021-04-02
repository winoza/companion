const user = []
const logo = $('#logo')
const profile = $('#profile')
const myPage = $('#my-page')
const commentBtn = $('.comment-btn')
const commentBox = $('.comment-box')
const addComment = $('.add-comment')
const comment = $('.comment-text')

$(document).ready(() => {
    // Does a GET request to figure out which user is logged in
    // stores the user info in an array
    // sets redirects for the logo and profile 
    $.get("/api/user_data").then(data => {
        const userObj = {
            username: data.displayName,
            userId: data.id
        }

        user.push(userObj)
        logo.attr("href", `/members/${data.id}`)
        profile.attr("href", `/members/${data.id}`)
        myPage.attr("href", `/members/${data.id}`)
        if (data.profileImage !== null){
            $('#mini-profile').attr("src", `..${data.profileImage}`)
        }
      });
  });

$(function(){

    commentBtn.on('click', function(event){
        event.preventDefault();
        const openId = $(this).attr('data-id')

        for ( i = 0; i < commentBox.length; i ++){
            const index = $(commentBox[i])
            const boxId = index.attr('data-id')
            //creates a toggle effect for the add comment button
            if (boxId === openId){
                if (index.attr('data-display') == "false"){
                    index.attr('style', 'margin:0 -16px; display: inline;')
                    index.attr('data-display', 'true')
                } else
                {
                    index.attr('style', 'margin:0 -16px; display: none;')
                    index.attr('data-display', 'false')
                }
            }
        }
    })

    addComment.on('click', function(event){
        event.preventDefault();

        const commentId = $(this).attr('data-id')
        
        for ( i = 0; i < comment.length; i ++){
            const textId = $(comment[i])
            const btnId = textId.attr('data-id')
            //takes the text only from the correct textarea
            //creates comment object to send to the server
            if (btnId === commentId){       
                const newComment = {
                content: textId.val().trim() ,
                commenter: user[0].username,
                ImageId: commentId,
                UserId: user[0].userId
                }  
                
                //Keeps the user from submitting an empty comment
                if (!newComment.content){
                    alert('Your comment was empty. Please type something in to post a comment.')
                    return
                }
                $.ajax("/api/comments", {
                    type: "POST",
                    data: newComment
                })
                .then(function() {
                    location.reload()
                })
            }
        }
    })
})

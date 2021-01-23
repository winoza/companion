const user = []
const commentBtn = $('.comment-btn')
const commentBox = $('.comment-box')
const addComment = $('.add-comment')
const comment = $('.comment-text')

$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and stores the user info in an array
    $.get("/api/user_data").then(data => {
        const username = data.displayName 
        const userId = data.id
        const userObj = {
            username: username,
            userId: userId
        }
        user.push(userObj)
      });
  });

$(function(){

    commentBtn.on('click', function(event){
        event.preventDefault();
        const openId = $(this).attr('data-id')

        for ( i = 0; i < commentBox.length; i ++){
            const index = $(commentBox[i])
            const boxId = index.attr('data-id')

            if (boxId === openId){
                if(index.attr('data-display') == "false"){
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

            if (btnId === commentId){       
                const newComment = {
                content: textId.val().trim() ,
                commenter: user[0].username,
                PostId: commentId,
                UserId: user[0].userId
                }  
                
                if (!newComment.content){
                    alert('Your comment was empty. Please type something in to post a comment.')
                    return
                }
                $.ajax("/api/comments", {
                    type: "POST",
                    data: newComment
                })
                .then(function(newComment) {
                    console.log(newComment)
                    location.reload();
                })
            }
        }
    })
})

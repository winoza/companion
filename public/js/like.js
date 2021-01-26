const userInfo = []
const button = $('.like-btn')

$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and stores the user info in an array
    $.get("/api/user_data").then(data => {
        const usernameInfo = data.displayName 
        const userIdInfo = data.id
        const infoObj = {
            username: usernameInfo,
            userId: userIdInfo
        }
        userInfo.push(infoObj)
      });
  });

  $(function(){

        button.on('click', function(event){
            event.preventDefault();
            console.log(this)
            const likePostId = $(this).attr('data-id')
            console.log(likePostId)
            for ( i = 0; i < button.length; i ++){
                const likeBtn = $(button[i])
                const likeId = likeBtn.attr('data-id')
                console.log(likeId)

                if(likePostId === likeId){
                    const likeStatus = likeBtn.attr('data-like')

                    if(likeStatus === "false"){
                        likeBtn.attr('data-like', 'true')
                        
                        const liked = {
                            liked: '1',
                            UserId: userInfo[0].userId,
                            ImageId: likePostId
                        }
                        $.ajax("/api/likes", {
                            type: "POST",
                            data: liked
                        })
                        .then(function(){
                            return
                        })

                    }
                    else if(likeStatus === "true") {
                        likeBtn.attr('data-like', 'false')
                        
                        
                        $.get("/api/likes").then(data => {
                            if (data.UserId === userInfo[0].userId && data.PostId === likePostId){
                            const thisId = data.id
                            $.ajax({
                                method: "DELETE",
                                url: "/api/likes/" + thisId
                            }).then(function(){
                                
                            })
                            }
                            return
                        })
                    }
                }
    

            }
  })
  })

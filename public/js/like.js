const userInfo = []
const button = $('.like-btn')
const myLikedPosts = []

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
    // gets all likes associated with user and checks to see if posts are on the current page
    // for posts that have been liked, sets data-liked attribute to true
    $.get("/api/likes").then(item => {
        console.log(item)
        pagePosts = []
        for(y = 0; y < button.length; y ++){
            var btnIndex = $(button[y])
            var dataId = btnIndex.attr('data-id')
            pagePosts.push(dataId)
        }
        console.log(pagePosts)
        for( i = 0; i < item.length; i ++){
            var check = pagePosts.includes(`${item[i].ImageId}`)
                console.log(check)
                if(check !== false){
                    myLikedPosts.push(item[i].ImageId)
                
            }
            
        }
        console.log(myLikedPosts)
        for(x = 0; x < button.length; x++){
            var indexbtn = $(button[x])
            var buttonId = indexbtn.attr('data-id')
            var btnCheck = myLikedPosts.includes(parseInt(buttonId))
            console.log(buttonId)
            console.log(btnCheck)
            if(btnCheck === false){
                indexbtn.attr('data-like', false)
            } else {
                indexbtn.attr('data-like', true)
            }

        }
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
                            location.reload()
                            return
                        })

                    }
                    else if(likeStatus === "true") {
                        likeBtn.attr('data-like', 'false')
                
                            $.ajax({
                                method: "DELETE",
                                url: "/api/likes/" + likePostId
                                }).then(function(){
                                    location.reload()
                                    return
                                })
                            }
                            
                            
                }
            }
                            
        })
                    
    
})
  


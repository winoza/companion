const userInfo = []
const button = $('.like-btn')
const myLikedPosts = []

$(document).ready(() => {
    // Does a GET request to figure out which user is logged in
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
        pagePosts = []

        //pushes Post Ids (saved in data-id) to an array
        for(y = 0; y < button.length; y ++){
            var btnIndex = $(button[y])
            var dataId = btnIndex.attr('data-id')
            pagePosts.push(dataId)
        }
        
        //Checks if a users likes are linked to the Post Ids and pushes the result to an array
        for( i = 0; i < item.length; i ++){
            var check = pagePosts.includes(`${item[i].ImageId}`)
                
                if(check !== false){
                    myLikedPosts.push(item[i].ImageId)
            }
        }
        
        //Checks the like buttons associated with the posts to see if they include posts that the user has liked
        //Sets the data-like attribute to true or false based on result
        for(x = 0; x < button.length; x++){
            var indexbtn = $(button[x])
            var buttonId = indexbtn.attr('data-id')
            var btnCheck = myLikedPosts.includes(parseInt(buttonId))
            
            if(btnCheck === false){
                indexbtn.attr('data-like', false)
            } else {
                indexbtn.attr('data-like', true)
                indexbtn.attr('style', 'background-color: rgb(247, 203, 109) !important;')
            }
        }
    });   
});

$(function(){

    //Sets the function of the like button
    //Adds or deletes a like depending on the data-like status
    button.on('click', function(event){
        event.preventDefault();
    
        const likePostId = $(this).attr('data-id')

        for ( i = 0; i < button.length; i ++){
            const likeBtn = $(button[i])
            const likeId = likeBtn.attr('data-id')

            if(likePostId === likeId){
                const likeStatus = likeBtn.attr('data-like')

                //handles the like POST
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

                //handles the like DELETE
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
  


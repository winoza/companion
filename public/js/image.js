const editPost = $('.edit-post')
const captionBox = $('.caption-box')
const updateCaption = $('.add-caption')
const caption = $('.caption-text')
const deletePost = $('.delete-post')
const timeStamp = $('.created-at')

$(document).ready(() => {
    // gets the id of the member page from the url
    const memberUrl = window.location.href
    const splitting = memberUrl.split('/')
    const currentPageId = splitting[splitting.length - 1]

    //Displays edit and delete buttons for posts if they belong to the logged in user
    $.get("/api/user_data").then(data => {
        
        if(editPost.length > 0){
        const creator = $(editPost[0]).attr('data-creator')
            
            if(`${data.id}` !== `${creator}`){
                editPost.attr('style', 'display: none;')
                deletePost.attr('style', 'display: none;')
            }
        }
    });
    //sets timestamp for posts on current page
    $.ajax({
        method: "GET",
        url: "/api/members/" + currentPageId,
    })
    .then(function(data){
        
        for(i = 0; i < data.user.posts.length; i ++){
            const posts = data.user.posts[i]
            const currentTime = new Date()
            const createdTime = new Date(`${posts.createdAt}`)
            const elapsed = currentTime - createdTime
            const seconds = Math.floor(elapsed / 1000)
            const minutes = Math.floor(seconds / 60)
            const hours = Math.floor(minutes / 60)
            const days = Math.floor(hours / 24)

            if(days < 1 && hours < 1 && minutes < 1){
                $(timeStamp[i]).text(`${seconds} seconds ago`)
            } else if (days < 1 && hours < 1){
                $(timeStamp[i]).text(`${minutes} minutes ago`)
            } else if (days < 1){
                $(timeStamp[i]).text(`${minutes} hours ago`)
            } else {
                $(timeStamp[i]).text(`${days} days ago`)
            }
        }
    })
});

$(function(){
    //deletes the image
    deletePost.on('click', function(event){
        event.preventDefault()
        var post_Id = $(this).attr('data-post')

        $.ajax({
            method: "DELETE",
            url: "/api/images/" + post_Id
        })
        .then(function(){
            location.reload()
        })
    })
    //opens textarea to create new caption
    editPost.on('click', function(event){
        event.preventDefault()
        post_Id = $(this).attr('data-post')
        
        for (i = 0; i < captionBox.length; i ++){
            const capIndex = $(captionBox[i])
            const capId = capIndex.attr('data-post')
            
            if (capId === post_Id){
                if (capIndex.attr('data-display') == "false"){
                    capIndex.attr('style', 'margin:0 -16px; display: inline;')
                    capIndex.attr('data-display', 'true')
                } else 
                {
                    capIndex.attr('style', 'margin:0 -16px; display: none;')
                    capIndex.attr('data-display', 'false')
                }
            }
        }
    })
    //submits new caption
    updateCaption.on('click', function(event){
        event.preventDefault()
        post_Id = $(this).attr('data-post')

        for (i = 0; i < caption.length; i ++){
            const captionId = $(caption[i]).attr('data-post')

            if (captionId === post_Id) {
                const newCaption = {
                    caption: $(caption[i]).val().trim(),
                    id: captionId
                }
                $.ajax({
                    method: "PUT",
                    url: "/api/images",
                    data: newCaption
                })
                .then(function() {
                    location.reload()
                })
            }
        }
    })
})
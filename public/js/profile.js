const profileId = 4
const imageBtn = $('#editProfile')
const detailsBtn = $('#editDetails')
const profileBtn = $('#profile-btn')
const profileImg = $('#profile-image')
const profileUser = $('#displayName')
const profileFav = $('#favorites')
const profileLoc = $('#location')
const profileBir = $('#birthday')

$(function(){

    imageBtn.on('click', function(event){
        event.preventDefault()
        window.location.href = "/profileimage"
    })

    detailsBtn.on('click', function(event){
        event.preventDefault()
        window.location.href = "/aboutme"
    })

    profileBtn.on('click', function(event){
        event.preventDefault()

        const profileObj = {
            id: profileId,
            displayName: profileUser.val().trim(),
            favorites: profileFav.val().trim(),
            location: profileLoc.val().trim(),
            birthday: profileBir.val()
        }

        $.ajax({
            url: '/uploadProfile',
            method: 'PUT',
            data: profileObj
        })
        .then(function(){
            window.location.href = "/members/" + profileId
        })

    } )

})

$(document).ready(() => {
    // gets the id of the member page from the url
    const pageUrl = window.location.href
    const urlSplit = pageUrl.split('/')
    const pageId = urlSplit[urlSplit.length - 1]
    

    // gets user data and fills in the form if there is previous data
    //Sets up profileId array and determines if edit buttons should be hidden
    $.get("/api/user_data").then(data => {
        
        const profileName = data.displayName 
        const profileImage = data.profileImage
        const myFavorites = data.favorites
        const myLocation = data.location
        const myBirthday = data.birthday
        
        if(!null){
        profileUser.val(profileName)
        profileImg.val(profileImage)
        profileFav.val(myFavorites)
        profileLoc.val(myLocation)
        profileBir.val(myBirthday)
        }

        //pushes user id to an array for use in other functions
        profileId.push(data.id)

        //sets display none for editing buttons if the logged in user's id does not match the page id
        if(`${pageId}` !== `${data.id}`){
            imageBtn.attr("style", "display: none")
            detailsBtn.attr("style", "display: none")
        }
      });
  });
const searchFor = $("#search")
const searchBtn = $("#search-btn")
const smallsearchFor = $("#small-search")
const smallsearchBtn = $("#small-search-btn")

//waits until page is loaded to make buttons active
$(function(){

    //search using main nav bar
    searchBtn.on('click', function(event){
        event.preventDefault();

        const searchForUser = searchFor.val().trim()
        getMembers(searchForUser)  
    })

    //search using small nav bar
    smallsearchBtn.on('click', function(event){
        event.preventDefault();

        const smallSearchForUser = smallsearchFor.val().trim()
        getMembers(smallSearchForUser)
    })
})

//Gets all members, finds the index for the search
//redirects to that member's page based on the index
function getMembers(searchvalue) {
    $.get("/api/members").then(data => {
            
        const memberIndex = findIndex(data, "displayName", searchvalue)
            if(memberIndex !== -1){
                window.location.href = `/members/${data[memberIndex].id}`
            } else {
                window.location.href = `/notfound`
            }
    })
}

//takes in an array, attr, and value
//returns the index where the array attribute value is equal to the desired value or else -1
function findIndex(array, attr, value) {
    for (var i = 0; i < array.length; i ++){
        
        if(array[i][attr] === value){
            return i
        }       
    }
    return -1   
}
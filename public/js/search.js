const searchFor = $("#search")
const searchBtn = $("#search-btn")

$(function(){

    searchBtn.on('click', function(event){
        event.preventDefault();

        const searchForUser = searchFor.val().trim()
        console.log(searchForUser)

        $.get("/api/members").then(data => {
            console.log(data)
            
            const memberIndex = findIndex(data, "displayName", searchForUser)
                if(memberIndex !== -1){
                    window.location.href = `/members/${data[memberIndex].id}`
                } else {
                    window.location.href = `/notfound`
                }
        })
    })
})

function findIndex(array, attr, value) {
    for (var i = 0; i < array.length; i ++){
        
        if(array[i][attr] === value){
            return i
        }       
    }
    return -1  
    
}
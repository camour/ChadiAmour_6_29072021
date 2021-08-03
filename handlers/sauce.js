
const likeSauce = (request, sauce) => {
    if(!sauce.usersLiked.includes(request.body.userId)){
        sauce.usersLiked.push(request.body.userId);
        sauce.likes++;
    }
    if(sauce.usersDisliked.includes(request.body.userId)){
        sauce.usersDisliked.pop(request.body.userId);
        sauce.dislikes-- ;
    }
}

const dislikeSauce = (request, sauce) => {
    if(sauce.usersLiked.includes(request.body.userId)){
        sauce.usersLiked.pop(request.body.userId);
        sauce.likes--;
    }
    if(!sauce.usersDisliked.includes(request.body.userId)){
        sauce.usersDisliked.push(request.body.userId);
        sauce.dislikes++;
    } 
}

const cancelLiking = (request, sauce) => {
    if(sauce.usersLiked.includes(request.body.userId)){
        sauce.usersLiked.pop(request.body.userId);
        sauce.likes--;
    }
    if(sauce.usersDisliked.includes(request.body.userId)){
        sauce.usersDisliked.pop(request.body.userId);
        sauce.dislikes--;
    }
}

exports.likingSauceHandler = (request, sauce) => {
    let message = '';
    if(request.body.like == 1){
        likeSauce(request, sauce);
        message = 'User liked it !';      
    }
    else if(request.body.like == -1){
        dislikeSauce(request, sauce);
        message = 'User disliked it !';               
    }
    else if(request.body.like == 0){
        cancelLiking(request, sauce);
        message = 'User canceled his liking !';   
    }
    
    return message;
}
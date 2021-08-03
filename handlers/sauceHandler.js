
exports.likingSauceHandler = (request, sauce) => {
    let message = '';
    if(request.body.like == 1){
        if(!sauce.usersLiked.includes(request.body.userId)){
            sauce.usersLiked.push(request.body.userId);
            sauce.likes++;
        }
        if(sauce.usersDisliked.includes(request.body.userId)){
            sauce.usersDisliked.pop(request.body.userId);
            sauce.dislikes-- ;
        }
        message = 'User liked it !';      
    }
    if(request.body.like == -1){
        if(sauce.usersLiked.includes(request.body.userId)){
            sauce.usersLiked.pop(request.body.userId);
            sauce.likes--;
        }
        if(!sauce.usersDisliked.includes(request.body.userId)){
            sauce.usersDisliked.push(request.body.userId);
            sauce.dislikes++;
        } 
        message = 'User disliked it !';               
    }
    if(request.body.like == 0){
        if(sauce.usersLiked.includes(request.body.userId)){
            sauce.usersLiked.pop(request.body.userId);
            sauce.likes--;
        }
        if(sauce.usersDisliked.includes(request.body.userId)){
            sauce.usersDisliked.pop(request.body.userId);
            sauce.dislikes--;
        }
        message = 'User canceled his liking !';   
    }
    
    return message;
}
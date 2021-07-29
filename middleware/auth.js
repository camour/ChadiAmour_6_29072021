const jwt = require('jsonwebtoken');


module.exports = (request, response, next) =>{
    try{
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        const userId = decodedToken.userId;
        if(request.body.userId && (requestbody.userId != userId)){
            throw 'Invalid User';
        }else{                     
            next();
        }
    }
    catch(error){
        response.status(401).json({error: error|'Unauthenticated request !'});
    }
};
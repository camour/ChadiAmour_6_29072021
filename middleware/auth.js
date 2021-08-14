const jwt = require('jsonwebtoken');


module.exports = (request, response, next) =>{
    try{
        const token = request.headers.authorization.split(' ')[1];
        // checks if the token signed part is valid based oh the header and the payload data also
        // contained in the token
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        const userId = decodedToken.userId;
        if(request.body.userId && (request.body.userId != userId)){            
            throw 'Invalid User';
        }else{                     
            next();
        }
    }
    catch(error){        
        response.status(401).json({error: error|'Unauthenticated request !'});
    }
};
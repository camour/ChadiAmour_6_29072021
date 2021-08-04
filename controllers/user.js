
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = (request, response, next) => {
   bcrypt.hash(request.body.password, 10)
   .then(passwordHash => {
    const user = new User({
        email: request.body.email,
        password: passwordHash
    });
    user.save()
    .then(()=> response.status(201).json({message: 'User created !'}))
    .catch(error => response.status(400).json({error}));
   })
   .catch(error => response.status(500).json({error}));    

};

exports.login = (request, response, next) => {
    User.findOne({email: request.body.email})
    .then(user => {
        if(!user){
            return response.status(401).json({error: 'Incorrect email or password'});
        }
        bcrypt.compare(request.body.password, user.password)
        .then(valid => {
            if(!valid){
                return response.status(401).json({error: 'Incorrect email or password'});
            }

            response.status(200).json({
                userId: user._id,
                token: jwt.sign({userId: user._id}, 'RANDOM_SECRET_TOKEN', {expiresIn: '24h'})
            });
                        
        })
        .catch(error => response.status(500).json({error}));
    
    })
    .catch(error => response.status(500).json({error}));
   
};
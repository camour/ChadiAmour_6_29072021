
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');
const utf8 = require('utf8');



exports.signup = (request, response, next) => {
    // we save the password under an hash (with a salt) so any hackers who would access the database can't
    // retry the original password
   bcrypt.hash(request.body.password, 10)
   .then(passwordHash => {
    // encoding makes it less easier for hackers to decode the email
    const user = new User({
        email: base64.encode(utf8.encode(request.body.email)),
        password: passwordHash
    });
    user.save()
    .then(()=> response.status(201).json({message: 'User created !'}))
    .catch(error => response.status(400).json({error}));
   })
   .catch(error => response.status(500).json({error}));    

};

exports.login = (request, response, next) => {    
    User.findOne({email: base64.encode(utf8.encode(request.body.email))})
    .then(user => {
        if(!user){
            return response.status(401).json({error: 'Incorrect email or password'});
        }
        // we can not compare the password entered to the original password, we only compare their 
        // respective hash and this comparison makes it possible to know if it corresponds to the original password
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
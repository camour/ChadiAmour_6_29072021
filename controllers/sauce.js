const Sauce = require('../models/Sauce');

exports.getAllSauces = (request, response, next) =>{
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({error}));
}

exports.createSauce = (request, response, next) =>{
    const sauceObject = JSON.parse(request.body.sauce);
    console.log(request.file);
    const sauce = new Sauce({
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        imageUrl: request.file.originalname,
        heat: sauceObject.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    sauce.save()
    .then(() => response.status(200).json({message: 'Sauce created !'}))
    .catch(error => response.status(400).json({error}));    
    
}
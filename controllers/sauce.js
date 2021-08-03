const Sauce = require('../models/Sauce');

exports.getAllSauces = (request, response, next) =>{
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({error}));
}

exports.createSauce = (request, response, next) =>{
    const sauceObject = JSON.parse(request.body.sauce);
    //console.log(request.file);
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

exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({_id: request.params.id})
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({error}));
}

exports.modifySauce = (request, response, next) => {
    
    if(!request.file){        
        Sauce.updateOne({_id: request.params.id}, {...request.body})
        .then(() => response.status(200).json({message: 'Sauce modified without image file'}))
        .catch(error => response.status(400).json({error}));
    }
    else{        
        const sauceObject = JSON.parse(request.body.sauce);
        Sauce.updateOne({_id: request.params.id}, {
            userId: sauceObject.userId,
            name: sauceObject.name,
            manufacturer: sauceObject.manufacturer,
            description: sauceObject.description,
            mainPepper: sauceObject.mainPepper,
            imageUrl: request.file.originalname,
            heat: sauceObject.heat            
        })
        .then(() => response.status(200).json({message: 'Sauce modified with image file'}))
        .catch(error => response.status(400).json({error}));        
    }
    
}
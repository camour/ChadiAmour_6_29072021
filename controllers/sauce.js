const Sauce = require('../models/Sauce');
const sauceHandlers = require('../handlers/sauce');

exports.getAllSauces = (request, response, next) =>{
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({error}));
}

exports.createSauce = (request, response, next) =>{
    const sauceObject = JSON.parse(request.body.sauce);   
    const sauce = new Sauce({
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
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

    const sauceObject = request.file ? 
    {
        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
    } : {...request.body} ;

    Sauce.updateOne({_id: request.params.id}, {...sauceObject})
    .then(() => response.status(200).json({message: 'Sauce modified !'}))
    .catch(error => response.status(400).json({error}));

    /*
    if(!request.file){        
        Sauce.updateOne({_id: request.params.id}, {...request.body})
        .then(() => response.status(200).json({message: 'Sauce modified without image file'}))
        .catch(error => response.status(400).json({error}));
    }
    else{        
        const sauceObject = JSON.parse(request.body.sauce);
        Sauce.updateOne({_id: request.params.id}, {
            name: sauceObject.name,
            manufacturer: sauceObject.manufacturer,
            description: sauceObject.description,
            mainPepper: sauceObject.mainPepper,
            imageUrl: request.file.originalname,
            heat: sauceObject.heat            
        })
        .then(() => response.status(200).json({message: 'Sauce modified with image file'}))
        .catch(error => response.status(400).json({error}));        
    }*/
    
}

exports.deleteSauce = (request, response, next) => {
    Sauce.deleteOne({_id: request.params.id})
    .then(() => response.status(200).json({message: 'Sauce deleted !'}))
    .catch(error => response.status(400).json({error}));
}

exports.likeOrDislikeSauce = (request, response, next) => {
        Sauce.findOne({_id: request.params.id})
        .then(sauce => {
           
            const message = sauceHandlers.likingSauceHandler(request, sauce);
                
            Sauce.updateOne({_id: request.params.id},{
                likes: sauce.likes,
                dislikes: sauce.dislikes,
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked
            })
            .then(() => response.status(201).json({message: 'Liking t'}))
            .catch(error => response.status(400).json({error}));            
            
        })
        .catch(error => response.status(404).json({error}));       
}
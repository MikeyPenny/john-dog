const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');
const User = require('../models/user');
const path = require('path');
const multer = require('multer');

var upload = multer({ dest: path.join(__dirname, '../public/images') });

router.post('/newDoggie', upload.single('picture'), (req, res, next) => {

    const _id = req.session.user._id;

    let newPet = {name, age, breed, birthday, foodType, BrandOfFood, chipNumber, picture, vaccines, 
                medicines, injuresOrDiseases, comments} = req.body;

    

    newPet = new Pet({
        name,
        age,
        breed,
        birthday,
        foodType,
        BrandOfFood,
        chipNumber,
        picture: req.file.filename,
        vaccines,
        medicines,
        injuresOrDiseases,
        comments,
        owner: _id
    })

    Pet.findOne({name: newPet.name, owner: newPet._id})
    .then((pet) => {
        
        if (pet) res.status(403).json({ message: 'pet already added to database' });
        else {
            newPet.save()
            .then(() => {
                res.status(200).json({ message: 'Pet has been registered succesfully' });
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            });
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });

});

router.get('/myPack', (req, res, next) => {
    
    Pet.find({owner: req.session.user._id})
    .then((pets) => {
        res.status(200).json({ pets: pets });
    })
    .catch((err) => {
        res.status(403).json({ message: err });
    });

});

router.get('/myPack/:id', (req, res, next) => {
    debugger
    Pet.findById(req.params.id)
    .then((pet) => {
        res.status(200).json({ pet: pet});
    })
    .catch((err) => {
        res.status(403).json({ message: err });
    });
});

router.post('/updateDoggie', (req, res, next) => {

    let newPetVals = {name, age, breed, birthday, foodType, BrandOfFood, chipNumber, picture, vaccines, 
        medicines, injuresOrDiseases, comments} = req.body;


    newPetVals = new Pet({
        name,
        age,
        breed,
        birthday,
        foodType,
        BrandOfFood,
        chipNumber,
        picture: req.file.filename,
        vaccines,
        medicines,
        injuresOrDiseases,
        comments,
        owner
    });

    Pet.findByIdAndUpdate(req.body.id, newPetVals)
    .then((response) => {
        res.status(200).json({ pet: response })
    })
    .catch((err) => {
        res.status(403).json({ message: err });
    });

});

router.get('/found/:id', (req, res, next) => {

    Pet.findById(req.params.id)
    .then((pet) => {
        res.status(200).json({ pet: pet});
    })
    .catch((err) => {
        res.status(403).json({ message: err });
    });

});

module.exports = router;


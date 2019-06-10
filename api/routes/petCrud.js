const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Pet = require('../models/pet');
const path = require('path');
const multer = require('multer');

var upload = multer({ dest: path.join(__dirname, '../public/images') });

router.post('/newDoggie', upload.single('picture'), (req, res, next) => {
    
    req.file
    debugger

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

module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


const saltRounds = 10;

router.get("/signup", (req, res) => {
    res.send("ok")
})

router.post('/signup', (req, res, next) => {
    
    let newUser = {name, email, password, phone, address} = req.body;

    User.findOne({email: req.body.email})
    .then((user) => {
        debugger
        if (user) res.status(403).json({ message: 'user already registered' });
        else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) res.status(403).json({ message: err });
                else {
                    newUser.password = hash;
                    User.create(newUser)
                    .then(() => {
                        res.status(200).json({ message: 'user successfully registered' });
                    })
                    .catch((err) => {
                        
                        res.status(500).json({ message: err });
                    });
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });

});

router.post('/login', (req, res, next) => {
    
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) res.status(500).json({ message: err });
                else if (match) {
                    // René [14:56]
                    user = JSON.parse(JSON.stringify(user));
                    delete user.password;
                    req.session.user = user;
                    res.status(200).json({message: 'Logged in', user: user});
                } else {
                    res.status(403).json({ message: 'invalid credentials' });
                }
            });
        } else {
            res.status(403).json({ message: 'invalid credentials' });
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });

});

router.post('/get-user', (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(403).json({ message: 'Not logged in' });
    }
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).json({ message: 'Logged out' });
    } else {
        res.status(403).json({ message: 'Not logged in' });
    }
});


module.exports = router;
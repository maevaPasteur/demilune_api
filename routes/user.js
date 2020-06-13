const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';


// Getting all
router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Getting one
router.get('/:id', async (req,res) => {
    try {
        const page = await User.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    let userData = new User({
        email: req.body.email,
        username: req.body.username
    });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash;
        User.create(userData)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['email', 'username', 'password'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const updateUser = await User.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removeItem = await User.deleteOne({ _id: req.params.id });
        res.json(removeItem);
    } catch(err) {
        res.json({ message: err })
    }
});

// Login
router.post('/login', async (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const playload = {
                    _id: user._id,
                    username: user.username
                };
                let token = jwt.sign(playload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                res.send(token)
            } else {
                res.json({ error: "L'utilisateur n'exsite pas" })
            }
        } else {
            res.json({ error: "L'utilisateur n'exsite pas" })
        }
    }).catch(err => {
        res.send('error: ', err)
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const General = require('../models/General');

// Getting all
router.get('/', async (req,res) => {
    try {
        const general = await General.find();
        res.json(general);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Creating
router.post('/', (req, res) => {

    // Verify is General has already been created
    General.find({}, async (err) => {

        // Create one if no one exists
       if(err) {
           const general = new General();
           let items = ['title', 'phone', 'address', 'pages', 'planning'];
           items.forEach(item => {
               if(req.body[item]) {
                   general[item] = req.body[item]
               }
           });
           try {
               const data = await general.save();
               res.status(201).json(data);
           } catch(err) {
               res.status(400).json(err);
           }
       } else {
           res.send('Général a déjà été initialisé. Vous ne pouvez pas en créer un deuxième.')
       }
    });
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['title', 'phone', 'address', 'pages', 'planning'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const update = await General.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(update);
    } catch (err) {
        res.json({ message: err })
    }
});


module.exports = router;
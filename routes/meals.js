const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const createComponent = require('../helpers/createComponent');

// Getting all
router.get('/', async (req,res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Getting one
router.get('/:id', (req,res) => {
    res.send('Voici le plat : '+ req.params.id)
});

// Creating one
router.post('/', async (req, res) => {
    const meal = new Meal({
        title: req.body.title,
        type: req.body.type
    });
    let items = ['description', 'infos', 'price', 'variant_1_title', 'variant_1_description', 'variant_1_price', 'variant_2_title', 'variant_2_description', 'variant_2_price'];
    items.forEach(item => {
        if(req.body[item]) {
            meal[item] = req.body[item]
        }
    });
    try {
        const data = await meal.save();
        createComponent(data._id, 'meal');
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Updating one
router.patch('/:id', (req, res) => {

});

// Deleting one
router.delete('/:id', (req, res) => {

});

module.exports = router;
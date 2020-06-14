const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const component = require('../helpers/components');

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
router.get('/:id', async (req,res) => {
    try {
        const page = await Meal.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    const meal = new Meal({
        title: req.body.title,
        type: req.body.type
    });
    let items = ['description', 'infos', 'price', 'variant_1_title', 'variant_1_price', 'variant_2_title', 'variant_2_price'];
    items.forEach(item => {
        if(req.body[item]) {
            meal[item] = req.body[item]
        }
    });
    try {
        const data = await meal.save();
        component.create(data._id, 'meal');
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props =  ['title', 'type', 'description', 'infos', 'price', 'variant_1_title', 'variant_1_price', 'variant_2_title', 'variant_2_price'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const updateMeal = await Meal.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(updateMeal);
    } catch(err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removeMeal = await Meal.deleteOne({ _id: req.params.id });
        component.delete(req.params.id);
        res.json(removeMeal);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;
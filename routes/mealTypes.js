const express = require('express');
const router = express.Router();
const MealType = require('../models/MealType');

const component = require('../helpers/components');

// Getting all
router.get('/', async (req,res) => {
    try {
        const mealTypes = await MealType.find();
        res.json(mealTypes);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Getting one
router.get('/:id', async (req,res) => {
    try {
        const page = await MealType.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    const mealTypes = new MealType({
        title: req.body.title
    });
    try {
        const data = await mealTypes.save();
        component.create(data._id, 'meal');
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
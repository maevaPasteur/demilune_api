const express = require('express');
const router = express.Router();
const MealType = require('../models/MealType');

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
router.get('/:id', (req,res) => {
    res.send('Le type'+ req.params.id)
});

// Creating one
router.post('/', async (req, res) => {
    const mealTypes = new MealType({
        title: req.body.title
    });
    try {
        const data = await mealTypes.save();
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
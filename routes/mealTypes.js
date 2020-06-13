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
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        const updatedMealType = await MealType.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } });
        res.json(updatedMealType);
    } catch (err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removeMealType = await MealType.remove({ _id: req.params.id });
        res.json(removeMealType);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;
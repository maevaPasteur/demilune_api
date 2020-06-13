const express = require('express');
const router = express.Router();
const Component = require('../models/Component');


// Getting all
router.get('/', async (req,res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});


// Getting one
router.get('/:id', async (req,res) => {
    try {
        const page = await Component.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Updating one
router.patch('/:id', (req, res) => {

});


// Deleting one
router.delete('/:id', (req, res) => {

});


module.exports = router;
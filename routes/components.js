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
router.get('/:id', (req,res) => {
    res.send(req.params.id)
});

// Updating one
router.patch('/:id', (req, res) => {

});


// Deleting one
router.delete('/:id', (req, res) => {

});


module.exports = router;
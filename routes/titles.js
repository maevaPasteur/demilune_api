const express = require('express');
const router = express.Router();
const Title = require('../models/Title');
const createComponent = require('../helpers/createComponent');

// Getting all
router.get('/', async (req,res) => {
    try {
        const pages = await Title.find();
        res.json(pages);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Getting one
router.get('/:id', (req,res) => {
    res.send('Vous êtes sur la page '+ req.params.id)
});

// Creating one
router.post('/', async (req, res) => {
    const title = new Title({
        title: req.body.title
    });
    if(req.body.subtitle) title.subtitle = req.body.subtitle;
    try {
        const data = await title.save();
        createComponent(data._id, 'title');
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
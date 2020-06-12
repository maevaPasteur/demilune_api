const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// Getting all
router.get('/', async (req,res) => {
    try {
        const pages = await Page.find();
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
    const page = new Page({
        title: req.body.title,
        content: req.body.content ? req.body.content : []
    });
    try {
        const data = await page.save();
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
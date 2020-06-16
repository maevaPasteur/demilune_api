const express = require('express');
const router = express.Router();
const General = require('../models/General');

// Getting all
router.get('/', async (req,res) => {
    try {
        const general = await General.find();
        pages = general[0].pages.filter(page => page.type === 'menu');
        res.json(pages);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});


// Getting one
router.get('/:id', async (req,res) => {
    try {
        const general = await General.find();
        page = general[0].pages.filter(page => page.id === req.params.id );
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    try {
        let general = await General.find();
        general = general[0];
        const menu = {
            id: Number(new Date()).toString(),
            title: req.body.title,
            price: req.body.price,
            type: 'menu'
        };
        let items = ['description', 'starters', 'meals', 'desserts'];
        items.forEach(item => {
            if(req.body[item]) {
                menu[item] = req.body[item]
            }
        });
        general.pages.push(menu);
        const update = await General.findByIdAndUpdate(general._id, general);
        res.status(201).json(update);
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
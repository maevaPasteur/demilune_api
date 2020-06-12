const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const createComponent = require('../helpers/createComponent');

// Getting all
router.get('/', async (req,res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Getting one
router.get('/:id', (req,res) => {
    res.send('Voici le menu : '+ req.params.id)
});

// Creating one
router.post('/', async (req, res) => {
    const menu = new Menu({
        title: req.body.title,
        price: req.body.price
    });
    let items = ['description', 'starters', 'meals', 'cheeses', 'desserts'];
    items.forEach(item => {
       if(req.body[item]) {
           menu[item] = req.body[item]
       }
    });
    try {
        const data = await menu.save();
        createComponent(data._id, 'menu');
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
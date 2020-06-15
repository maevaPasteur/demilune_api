const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

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
router.get('/:id', async (req,res) => {
    try {
        const page = await Menu.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    const menu = new Menu({
        title: req.body.title,
        price: req.body.price
    });
    let items = ['description', 'starters', 'meals', 'desserts'];
    items.forEach(item => {
       if(req.body[item]) {
           menu[item] = req.body[item]
       }
    });
    try {
        const data = await menu.save();
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['title', 'description', 'price', 'starters', 'meals', 'desserts'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const updateMenu = await Menu.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(updateMenu);
    } catch(err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removePage = await Menu.remove({ _id: req.params.id });
        /*
        component.remove(req.params.id);

         */
        res.json(removePage);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;
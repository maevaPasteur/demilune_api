const express = require('express');
const router = express.Router();
const General = require('../models/General');

// Getting all
router.get('/', async (req,res) => {
    try {
        const general = await General.find();
        res.json(general[0].pages);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});


// Getting one
router.get('/:id', async (req,res) => {
    try {
        const general = await General.find();
        page = general[0].pages.filter(page => page.id === req.params.id );
        res.json(page[0]);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    try {
        let general = await General.find();
        general = general[0];
        let page = req.body.page;
        page.id = Number(new Date()).toString();
        page.type = 'page';
        general.pages.push(page);
        const update = await General.findByIdAndUpdate(general._id, {
            $set: { pages: general.pages }
        });
        res.status(201).json(update);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Update all (order)
router.patch('/', async (req, res) => {
    try {
        // Ge the general id
        let general = await General.find();
        general = general[0];

        // Update pages data
        const update = await General.findByIdAndUpdate(general._id, {
            $set: { pages: req.body.pages }
        });
        res.status(201).json(update);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Update one
router.patch('/:id', async (req, res) => {
    try {
        // Ge the general id
        let general = await General.find();
        general = general[0];
        let pages = general.pages;

        // Update actual menu data
        for(let i=0; i<pages.length; i++) {
            if(pages[i].id === req.body.page.id) {
                pages[i] = req.body.page
            }
        }

        // Update pages data
        const update = await General.findByIdAndUpdate(general._id, {
            $set: { pages: pages }
        });
        res.status(201).json(update);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Update one
router.delete('/:id', async (req, res) => {
    try {
        // Ge the general id
        let general = await General.find();
        general = general[0];
        let pages = general.pages;

        // Remove the actual menu data
        for(let i=0; i<pages.length; i++) {
            if(pages[i].id === req.params.id) {
                pages.splice(i, 1);
            }
        }

        // Update pages
        const update = await General.findByIdAndUpdate(general._id, {
            $set: { pages: pages }
        });
        res.status(201).json(update);
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
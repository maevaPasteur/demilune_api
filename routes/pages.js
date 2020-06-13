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
router.get('/:id', async (req,res) => {
    try {
        const page = await Page.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
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
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['title', 'content'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const updatePage = await Page.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(updatePage);
    } catch (err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removePage = await Page.remove({ _id: req.params.id });
        res.json(removePage);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;
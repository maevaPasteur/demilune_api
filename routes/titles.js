const express = require('express');
const router = express.Router();
const Title = require('../models/Title');

const component = require('../helpers/components');



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
router.get('/:id', async (req,res) => {
    try {
        const page = await Title.findById(req.params.id);
        res.json(page);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Creating one
router.post('/', async (req, res) => {
    const title = new Title({
        title: req.body.title
    });
    if(req.body.subtitle) title.subtitle = req.body.subtitle;
    try {
        const data = await title.save();
        component.create(data._id, 'title');
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json(err);
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['title', 'subtitle'];
        props.forEach(prop => {
           if(req.body[prop]) {
               newDatas[prop] = req.body[prop]
           }
        });
        const updateTitle = await Title.updateOne(
             { _id: req.params.id },
             { $set: newDatas });
        res.json(updateTitle);
    } catch (err) {
        res.json({ message: err })
    }
});

// Deleting one
router.delete('/:id', async (req, res) => {
    try {
        const removeItem = await Title.deleteOne({ _id: req.params.id });
        component.delete(req.params.id);
        res.json(removeItem);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;
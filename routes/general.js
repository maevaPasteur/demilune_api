const express = require('express');
const router = express.Router();
const General = require('../models/General');

// Getting all
router.get('/', async (req,res) => {
    try {
        const general = await General.find();
        res.json(general);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// Creating
router.post('/', async (req, res) => {
    try {
        const oldGeneral = General.find();
        res.send(oldGeneral);
    } catch(err) {
        const general = new General();
        let items = ['title', 'button', 'title_2', 'text_2', 'pages', 'day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6', 'day_7', 'button_2'];
        items.forEach(item => {
            if(req.body[item]) {
                general[item] = req.body[item]
            }
        });
        try {
            const data = await general.save();
            res.status(201).json(data);
        } catch(err) {
            res.status(400).json(err);
        }
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try {
        let newDatas = {};
        let props = ['title', 'phone', 'address', 'pages', 'planning'];
        props.forEach(prop => {
            if(req.body[prop]) {
                newDatas[prop] = req.body[prop]
            }
        });
        const update = await General.updateOne(
            { _id: req.params.id },
            { $set: newDatas });
        res.json(update);
    } catch (err) {
        res.json({ message: err })
    }
});

// Updating one
router.patch('/', async (req, res) => {
    try {
        let general = await General.find();
        const update = await General.findByIdAndUpdate(general[0]._id, req.body.data);
        res.json(update);
    } catch (err) {
        res.json({ message: err })
    }
});


module.exports = router;
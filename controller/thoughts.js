const router = require('express').Router();
const { Thought } = require('../models/Thought');

// Post route for creating a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        newThought.save();

        if(newThought) {
            res.status(201).json(newThought);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for all thoughts
router.get('/', async (req, res) => {
    try {
        const result = await Thought.find({});

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for a single thought
router.get('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOne({ _id: req.params.thoughtId });

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Put route to update a single user
router.put('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete route for a single user
router.delete('/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        res.status(204).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
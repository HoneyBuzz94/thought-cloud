const router = require('express').Router();
const { User } = require('../models/Thought');

// Post route for creating a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.save();

        if(newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for all users
router.get('/', async (req, res) => {
    try {
        const result = await User.find({});

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for a single user
router.get('/:userId', async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.userId });

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
router.put('/:userId', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });

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
router.delete('/:userId', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(204).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const result = await Thought.find({});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async getSingleThought(req, res) {
        try {
            const result = await Thought.findOne({ _id: req.params.thoughtId });
            if(!result) {
                return res.status(404).json('No thought with that ID found');
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if(!user) {
                return res.status(200).json('Thought created, but no user with that ID found');
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async updateThought(req, res) {
        try {
            const result = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );
            if(!result) {
                return res.status(404).json('No thought with that ID found');
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if(!thought) {
                return res.status(404).json('No thought with that ID found');
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if(!user) {
                return res.status(404).json('Thought deleted, but user not found');
            }
            res.status(200).json('Thought deleted');
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if(!thought) {
                res.status(404).json('No thought with that ID found');
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            );
            if(!thought) {
                res.status(404).json('No thought or reaction with that ID found');
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
};

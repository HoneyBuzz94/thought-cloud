const User = require("../models/User");

module.exports = {
    async getUsers(req, res) {
        try {
            const result = await User.find({});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async getSingleUser(req, res) {
        try {
            const result = await User.findOne({ _id: req.params.userId });
            if (!result) {
                return res.status(404).json("No user with that ID found");
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async createUser(req, res) {
        try {
            const result = await User.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async updateUser(req, res) {
        try {
            const result = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!result) {
                return res.status(404).json("No user with that ID found");
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
    async deleteUser(req, res) {
        try {
            const result = await User.findOneAndDelete({ _id: req.params.userId });
            if(!result) {
                return res.status(404).json('No user with that ID found');
            }
            res.status(204).json('User deleted');
        } catch (err) {
            res.status(500).json(`Internal server error: ${err}`);
        }
    },
};

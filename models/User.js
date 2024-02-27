const mongoose = require('mongoose');
const { Thought, Reaction } = require('./');

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    thoughts: Thought,
    reactions: Reaction,
    friends: [],
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [],
});

// User model
const User = mongoose.model('User', userSchema);

// Reaction schema
const reactionSchema = mongoose.Schema({
    text: { type: String, required: true },
    username: userSchema,
    dateCreated: String,
});

// Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema);

// Thought schema
const thoughtSchema = new mongoose.Schema({
    text: { type: String, required: true },
    username: userSchema,
    reactions: [reactionSchema],
    dateCreated: String,
});

// Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { User, Reaction, Thought };
const mongoose = require('mongoose');
const { User, Reaction } = require('./');

// Thought schema
const thoughtSchema = new mongoose.Schema({
    text: { type: String, required: true },
    username: User.username,
    reactions: [Reaction],
    dateCreated: String,
});

// Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
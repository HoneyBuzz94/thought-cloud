const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [Reaction],
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
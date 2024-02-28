const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    text: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [Reaction],
});

thoughtSchema.virtual('reactionCount').get(function() { this.reactions.length });

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
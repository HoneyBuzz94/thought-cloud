const { response } = require('express');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: mongoose.Schema.ObjectId, default: () => new Types.ObjectId() },
    reactionText: { type: String, required: true, maxLength: 200 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = responseSchema;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
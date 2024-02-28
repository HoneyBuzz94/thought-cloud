const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, validate: { validator: () => Promise.resolve(false), message: 'Email validation failed' } },
    password: { type: String, required: true },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: this }]
});

userSchema.virtual('friendCount').get(function() { return this.friends.length });

const User = mongoose.model('user', userSchema);

module.exports = User;
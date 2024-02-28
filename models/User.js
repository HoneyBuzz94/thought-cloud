const mongoose = require('mongoose');
const validate = require('mongoose-validate');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, validate: [validate.email, 'The email entered is not valid'] },
    password: { type: String, required: true },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() { return this.friends.length });

const User = mongoose.model('user', userSchema);

module.exports = User;
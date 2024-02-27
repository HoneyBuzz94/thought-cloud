const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();

const { User, Reaction, Thought } = require('./models/Thought');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Post route for creating a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.save();

        if(newUser) {
            res.status(200).json(newUser);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for all users
app.get('/users', async (req, res) => {
    try {
        const result = await User.find({});

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json('Bad request');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

db.once('open', () => {
    db.dropDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});
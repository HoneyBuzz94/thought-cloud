const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const api = require('./controller/index');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});
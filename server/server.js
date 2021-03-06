const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users.route.js');

const app = express();
const PORT = process.env.PORT || 5000;
const server = 'http://localhost:';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('error', () => console.log('Connection failed to establish with database'));
mongoose.connection.once('open', () => console.log('Connection with database established'));

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Running server on: ${server}${PORT}`);
})
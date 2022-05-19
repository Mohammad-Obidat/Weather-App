const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./server/routes/api.js');

mongoose.connect('mongodb://localhost/weather', { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', api);

const PORT = 3000;
app.listen(PORT, console.log(`listening on ${PORT}`));

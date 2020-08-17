const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 1234;

const app = express();

//ROUTES

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Route use

app.listen(PORT, () => {
    console.log('Server is running on port: '+ PORT)
})
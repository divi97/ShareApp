const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 1234;

const app = express();

//ROUTES
const user = require('./routes/route');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Route use
app.use('/', user)

app.use('/uploads', express.static('uploads'));

app.use('/api/uploads*', (req, res, next) => {
    try {
      res.sendFile(__dirname + '/uploads' + req.params[0]);
      
  
    } catch (error) {
      next();
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port: '+ PORT)
})
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 1234;

const app = express();

//ROUTES
const user = require('./routes/userroute');
const friend = require('./routes/friendroute');
const files = require('./routes/fileshareroute');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Route use
app.use('/user', user)
app.use('/friend', friend)
app.use('/file', files)

app.use('/uploads', express.static('uploads'));
app.use("/fileuploads", express.static("fileuploads"));

app.use('/api/uploads*', (req, res, next) => {
    try {
      res.sendFile(__dirname + '/uploads' + req.params[0]);
    } catch (error) {
      next();
    }
});

app.use("/api/fileuploads*", (req, res, next) => {
  try {
    res.sendFile(__dirname + "/fileuploads" + req.params[0]);
  } catch (error) {
    next();
  }
});

app.listen(PORT, () => {
    console.log('Server is running on port: '+ PORT)
})
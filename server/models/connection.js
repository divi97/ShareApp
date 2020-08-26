const mongoose = require('mongoose');
const config = require('../constants/config')

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (!err) {
    console.log("Successfully connected to database");
  } else {
    console.log("Error connecting to database");
  }
});

module.exports = mongoose;
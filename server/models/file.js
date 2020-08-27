const mongoose = require('./connection');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: String
    },
    filepath: {
        type: String
    },
    userid: {
        type: String
    }

})

const fileModel = mongoose.model("file", fileSchema);
module.exports = fileModel
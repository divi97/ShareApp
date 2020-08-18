const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    base64: {
        type: String
    },
    userid: {
        type: String
    }

})

const fileModel = mongoose.model("file", fileSchema);
module.exports = fileModel
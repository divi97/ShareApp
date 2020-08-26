const mongoose = require('./connection');
const Schema = mongoose.Schema;

const fileShareSchema = new mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    fileid: {
        type: String
    }

})

const fileShareModel = mongoose.model("fileshare", fileShareSchema);
module.exports = fileShareModel
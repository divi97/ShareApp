const mongoose = require('./connection');

const shareSchema = new mongoose.Schema({
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

const shareModel = mongoose.model("share", shareSchema);
module.exports = shareModel
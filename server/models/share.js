const mongoose = require('mongoose');

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
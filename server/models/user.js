const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: String,
        required: [true, 'Please Provide Your name'],
        minlength: [3, 'Must be at least 3 characters.']
    },
    email: {
        type: String,
        trim: String,
        required: [true, 'Please Provide Your email'],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 8,
        select: false,
    },

    friendList: {
        type: []
    },
    files: {
        type: []
    },
    blocked: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    sharedFile: {
        type: []
    },
    confirmEmailToken: { 
        type: String 
    },
    verified: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    blocked: {
        type:String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    online: {
        type:String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel
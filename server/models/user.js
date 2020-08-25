const mongoose = require('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../constants/config')
const Schema = mongoose.Schema;

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
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profile: {
        type: String,
        required: [true, 'Please upload profile']
    },
    friendList: [{
        friendId: {type: Schema.Types.ObjectId, ref: 'User', default: null}
    }],
    blocked: {
        type:Boolean,
        default:false
    },
    verified: {
        type:Boolean,
        default:false
    },
    online: {
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        config.JWT_SECRET,
        {
            expiresIn: '2h',
        }
    );
};

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel
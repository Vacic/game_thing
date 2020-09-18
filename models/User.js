const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    login_token: {
        token: String,
        created: {
            type: Date,
            default: Date.now
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);
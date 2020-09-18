const mongoose = require('mongoose');

const loginTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    token: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('login_tokens', loginTokenSchema);
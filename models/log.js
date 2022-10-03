const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: String,
    title: {type: String, required: true},
    text: String,
    photoUrl: String,
    likes: [likesSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Log', logSchema);
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    photoUrl: String,
    journal: String,
})


module.exports = mongoose.model('Log', logSchema);
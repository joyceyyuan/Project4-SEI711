const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {type: String, required: true},
    // location: {
    //     type: {
    //         type: String, 
    //         enum: ['Point'], 
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    // startDate: {type: Date, required: true},
    // endDate:{type: Date, required: true},
    text: String,
    Category: {
        type: String,
        enum: ['plan', 'record'],
        default: 'record'
    },
    photoUrl: String,
    likes: [likesSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Log', logSchema);
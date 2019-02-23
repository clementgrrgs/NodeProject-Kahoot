const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Quizz = new Schema({
    title: String,
    creation_date: {
        type: Date,
        default: Date.now
    },
    creator: String,
    player: [String],
    duration: {
        type: Number,
        default: 10
    },
    questions: [{
        text: String,
        response: [String],
        answer: String,
        winners: [String]
    }],
    launch: {
        type: Boolean,
        default: false
    },
    pin: Number
});

module.exports = mongoose.model('Quizz', Quizz);
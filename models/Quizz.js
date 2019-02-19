const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Quizz = new Schema ({
    title: String,
    creation_date: { 
        type: Date,
        default: Date.now
    },
    creator: String,
    player: [String],
    questions: [{
        text: String,
        response: [String],
        duration: { 
            type: Number,
            default: 10
        },
        winners:[String]
    }]
});

module.exports = mongoose.model('Quizz',Quizz);
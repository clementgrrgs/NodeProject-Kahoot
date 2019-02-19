const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var User = new Schema({
    name: String,
    username: String,
    google: [{
        id: String,
        accessToken: String,
        refreshToken: String
    }]
});

var User = mongoose.model('User', User);

module.exports = User;
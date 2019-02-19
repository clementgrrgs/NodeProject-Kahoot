const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var findOrCreate = require('mongoose-findorcreate')


var User = new Schema({
    name: String,
    username: String,
    google: [{
        id: String,
        accessToken: String,
        refreshToken: String
    }],
    password: String,
    admin: Boolean,
});

User.plugin(findOrCreate);
var User = mongoose.model('User', User);

module.exports = User;
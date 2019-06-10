const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('users', new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String
}));

module.exports = User;
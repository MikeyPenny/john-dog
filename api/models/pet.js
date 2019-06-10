const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = mongoose.model('pets', new Schema({
    name: String,
    age: String,
    breed: String,
    birthDay: String,
    foodType: String,
    BrandOfFood: String,
    chipNumber: String,
    picture: String,
    vaccines : [{
        vaccineName: String,
        expirationDate: String
    }],
    medicines: [],
    injuresOrDiseases: [],
    comments: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}));

module.exports = Pet;

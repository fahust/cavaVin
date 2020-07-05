var mongoose = require('mongoose');

var vinSchema = new mongoose.Schema({
    name: String,
    price: String,
    desc: String,
    age: String,
    rating: { type: Number, min: 0, max: 10 },
    dateAchat:{ type: Date, default: Date.now },
    owner: String,
    image: String,
    tags: Array,
});

module.exports = mongoose.model('Vin', vinSchema);

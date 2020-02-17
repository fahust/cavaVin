var mongoose = require('mongoose');

var vinSchema = new mongoose.Schema({
    name: String,
    price: String,
    age: String,
    dateAchat:{ type: Date, default: Date.now },
    owner: String,
    tags: Array,
});

module.exports = mongoose.model('Vin', vinSchema);

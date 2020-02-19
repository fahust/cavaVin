var mongoose = require('mongoose');

var vinCommunitySchema = new mongoose.Schema({
    name: String,
    price: String,
    age: String,
    dateAchat:{ type: Date, default: Date.now },
    owner: String,
    note: Array,
    nbrNote: String,
});

module.exports = mongoose.model('VinCommunity', vinCommunitySchema);

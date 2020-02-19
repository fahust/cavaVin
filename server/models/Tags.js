var mongoose = require('mongoose');

var tagsSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Tags', tagsSchema);

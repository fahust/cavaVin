var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vinApp', {useNewUrlParser: true});
// mongoose.connect('mongodb+srv://fahust:skisoboy@cavavin-dexvv.mongodb.net/test?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is connected');
});

module.exports = app => {
    app.models = {
        Vin: require("./Vin"),
        VinCommunity: require("./VinCommunity"),
        User: require("./User"),
        Tags: require("./Tags"),
    };
};

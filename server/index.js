const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;


// default options
app.use(fileUpload({useTempFiles : true,
  tempFileDir : '/tmp/'}));


var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Import du dossier routes, controllers et models
require('./controllers')(app);
require('./models')(app);
require('./routes')(app);

app.listen(port, () => console.log(`Application is running`));

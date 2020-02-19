const express = require('express');
const app = express();
const port = 3000;


var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Import du dossier routes, controllers et models
require('./controllers')(app);
require('./models')(app);
require('./routes')(app);

app.listen(port, () => console.log(`Application is running`));

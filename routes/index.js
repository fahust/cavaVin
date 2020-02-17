module.exports = app => {

    require('./vin')(app);
    require('./user')(app);
    require('./vinCommunity')(app);
    //require('./media')(app);

    // HOME
    app.get('/', (req, res) => res.send('Accueil de l\'application!'));

};

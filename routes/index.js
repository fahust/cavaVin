module.exports = app => {

    //Ici on gère les routes, on injecte dans app (express) les routes de l'API qui elle appel les fonctions des controller
    require('./vin')(app);
    require('./user')(app);
    require('./vinCommunity')(app);
    require('./tags')(app);

    // HOME
    app.get('/', (req, res) => res.send('Accueil de l\'application!'));

};

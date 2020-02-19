module.exports = app => {
    app.controllers = {
        vin: require('./vin')(app),
        vinCommunity: require('./vinCommunity')(app),
        user: require('./user')(app),
        tags: require('./tags')(app),
        //question: require('./question')(app),
        //media: require('./media')(app)
    };
};
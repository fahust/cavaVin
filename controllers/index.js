module.exports = app => {
    app.controllers = {
        vin: require('./vin')(app),
        user: require('./user')(app),
        //question: require('./question')(app),
        //media: require('./media')(app)
    };
};
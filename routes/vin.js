module.exports = app => {

    // GET ALL VIN

    // GET BY FIRSTNAME
    //app.get('/users/:firstname', app.controllers.user.getUsersByFirstname);

    // ADD VIN
    app.post('/vin/add', app.controllers.vin.addVinCave);

    // UPDATE VIN
    app.post('/vin/update/', app.controllers.vin.updateVinCave);

    // DELETE VIN
    app.post('/vin/delete/', app.controllers.vin.deleteVinCave);

    // ADD VIN TAG
    app.post('/vin/tag/add/', app.controllers.vin.addTag);

    // DELETE VIN TAG
    app.post('/vin/tag/delete/', app.controllers.vin.deleteTag);

    // VIEW VIN
    app.post('/vin/view/', app.controllers.vin.viewVinCave);

    // LIST VIN
    app.get('/vin/list/', app.controllers.vin.listVinsCave);

    // SEARCH VIN
    app.post('/vin/search/', app.controllers.vin.searchVinCave);

    // test VIN
    app.get('/test/', app.controllers.vin.test);

}
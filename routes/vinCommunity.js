module.exports = app => {

    // GET ALL VIN

    // GET BY FIRSTNAME
    //app.get('/users/:firstname', app.controllers.user.getUsersByFirstname);

    // ADD VIN
    app.post('/vinCommunity/add', app.controllers.vinCommunity.addVinCave);

    // UPDATE VIN
    app.post('/vinCommunity/update/', app.controllers.vinCommunity.updateVinCave);

    // DELETE VIN
    app.post('/vinCommunity/delete/', app.controllers.vinCommunity.deleteVinCave);

    // ADD VIN TAG
    app.post('/vinCommunity/note/add/', app.controllers.vinCommunity.addNote);

    // DELETE VIN TAG
    app.post('/vinCommunity/note/delete/', app.controllers.vinCommunity.deleteNote);

    // VIEW VIN
    app.post('/vinCommunity/view/', app.controllers.vinCommunity.viewVinCave);

    // LIST VIN
    app.get('/vinCommunity/list/', app.controllers.vinCommunity.listVinsCave);

    // SEARCH VIN
    app.post('/vinCommunity/search/', app.controllers.vinCommunity.searchVinCave);

    // test VIN
    //app.get('/test/', app.controllers.vin.test);

}
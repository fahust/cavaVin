module.exports = app => {

    // GET ALL VIN

    // GET BY FIRSTNAME
    //app.get('/users/:firstname', app.controllers.user.getUsersByFirstname);

    // ADD VIN
    app.post('/vinCommunity/add', app.controllers.vinCommunity.addVinCommunity);

    // UPDATE VIN
    app.post('/vinCommunity/update/', app.controllers.vinCommunity.updateVinCommunity);

    // DELETE VIN
    app.post('/vinCommunity/delete/', app.controllers.vinCommunity.deleteVinCommunity);

    // ADD VIN TAG
    app.post('/vinCommunity/note/add/', app.controllers.vinCommunity.addNote);

    // DELETE VIN TAG
    app.post('/vinCommunity/note/delete/', app.controllers.vinCommunity.deleteNote);

    // VIEW VIN
    app.post('/vinCommunity/view/', app.controllers.vinCommunity.viewVinCommunity);

    // LIST VIN
    app.get('/vinCommunity/list/', app.controllers.vinCommunity.listVinsCommunity);

    // SEARCH VIN
    app.post('/vinCommunity/search/', app.controllers.vinCommunity.searchVinCommunity);

    // test VIN
    //app.get('/test/', app.controllers.vin.test);

}
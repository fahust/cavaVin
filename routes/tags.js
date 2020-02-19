module.exports = app => {

    // GET ALL VIN

    // GET BY FIRSTNAME
    //app.get('/users/:firstname', app.controllers.user.getUsersByFirstname);


    // ADD VIN TAG
    app.post('/tag/add/', app.controllers.tags.addTag);

    // DELETE VIN TAG
    app.post('/tag/delete/', app.controllers.tags.deleteTag);

}
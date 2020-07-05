


module.exports = app => {


//var multer  = require('multer');
//var upload = multer({ dest: 'upload/'});
var fs = require('fs');
var jwt = require('jsonwebtoken');
var timeExpiration = 60000;

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
//var type = upload.single('recfile');

app.post('/upload', function (req,res) {
    ownerVerified = jwt.verify(req.body.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.owner){

                app.models.Vin.findOne({'name': req.body.vinname , 'owner': ownerVerified.user },  function (err, vin) {
                    if (err) 
                        res.send(err); 
                    if(!vin){
                        res.send('Vin '+req.body.vinname+' does not exist');
                    }else{
                        
                        if (!req.files || Object.keys(req.files).length === 0) {
                            return res.status(400).send('No files were uploaded.');
                          }
                          vin.image = req.files.myImage.name;
                          vin.save();
                        
                          req.files.myImage.mv(__dirname +'/../upload/' + req.files.myImage.name , function(err) {
                            if (err)
                              return res.status(500).send(err);
                            filepath = __dirname +'/../upload/' + req.files.myImage.name;
                            var file = fs.readFile(__dirname +'/../upload/' + req.files.myImage.name, function read(err, data) {
                                if (err) {
                                    throw err;
                                }
                                var newVin = {}
                                newVin.vin = vin;
                                newVin.imageBuffer = data;
                                res.json(newVin)
                            });
                          });

                    }
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    

});

        

    // GET ALL VIN

    // GET BY FIRSTNAME
    //app.get('/users/:firstname', app.controllers.user.getUsersByFirstname);

    // ADD VIN
    app.post('/vin/add/', app.controllers.vin.addVinCave);

    // UPDATE VIN
    app.post('/vin/update/', app.controllers.vin.updateVinCave);

    // RATING VIN
    app.post('/vin/rating/', app.controllers.vin.ratingVinCave);

    // DELETE VIN
    app.post('/vin/delete/', app.controllers.vin.deleteVinCave);

    // ADD VIN TAG
    app.post('/vin/tag/add/', app.controllers.vin.addTag);

    // DELETE VIN TAG
    app.post('/vin/tag/delete/', app.controllers.vin.deleteTag);

    // VIEW VIN
    app.post('/vin/view/', app.controllers.vin.viewVinCave);

    // LIST VIN
    app.post('/vin/list/', app.controllers.vin.listVinsCave);

    // SEARCH VIN
    app.post('/vin/search/', app.controllers.vin.searchVinCave);
    
   
}
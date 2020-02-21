var jwt = require('jsonwebtoken');
var timeExpiration = 60000;
module.exports = app => {
    return {addVinCave,updateVinCave, viewVinCave, deleteVinCave, searchVinCave, listVinsCave, addTag, deleteTag};
    /*add or edit if exist in array*/
    function addVinCave(req, res){
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        console.log(Date.now()-timeExpiration , ownerVerified.iat);
        if(Date.now()-timeExpiration < ownerVerified.iat){
            req.body.vin.owner = ownerVerified.user;
            if(req.body.vin.owner){
                app.models.Vin.find({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                    if (err) 
                        res.send(err); 
                    if(Array.isArray(vin) && vin.length<=0){
                        vinSaved = new app.models.Vin(req.body.vin);
                        vinSaved.save();
                        res.send('Vin created');
                    }else{
                        res.send('Vin '+req.body.vin.name+' already exist');
                    }
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /* edit vin*/
    function updateVinCave(req, res) {
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.findOneAndUpdate({'name': req.body.vin.name , 'owner': ownerVerified.user },  {$set:{'name': req.body.vin.newName,'price':req.body.vin.newPrice,'age':req.body.vin.newAge,'dateAchat':req.body.vin.newDateAchat}}, {useFindAndModify: false},  function (err, vin) {
                    if (err) 
                        res.send(err); 
                    if(!vin){
                        res.send('Vin '+req.body.vin.name+' does not exist');
                    }else{
                        res.send('Vin '+req.body.vin.name+' updated');
                    }
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /* add tag vin*/
    function addTag(req, res) {
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.findOne({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                    if (err) 
                        res.send(err); 

                    if(vin){
                        vin.tags.push(req.body.vin.newTag);
                        vin.save();
                        res.send('Tag '+req.body.vin.newTag+' added to '+req.body.vin.name);
                    }else{
                        res.send('Vin '+req.body.vin.name+' not exist in your cave');
                    }
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /* delete tag vin*/
    function deleteTag(req, res) {
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.find({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                    if (err) 
                        res.send(err); 
                    if(vin){
                        for (var index = 0; index < vin.tags.length; index++) {
                            if(vin.tags[index] == req.body.vin.newTag)
                                delete vin.tags[index];
                        }
                        vin.save();
                        res.send('Tag '+req.body.vin.newTag+' deleted to '+req.body.vin.name);
                    }else{
                        res.send('Vin '+req.body.vin.name+' not exist in your cave');
                    }
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /*return one vin in cave*/
    function viewVinCave(req, res){
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.find({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                    if (err) 
                        res.send(err); 
                    return res.json(vin);
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /*delete vin in cave*/
    function deleteVinCave(req, res){
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.findOneAndDelete({'name': req.body.vin.name , 'owner': ownerVerified.user}, {}, function(err, vin) {
                    if (err) 
                        res.send(err);
                    res.json('Le vin ' + req.body.vin.name + 'a bien été supprimé');
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /*return list of vin by point*/
    function searchVinCave(req, res){
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.find({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user } , {tags: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user} ]}, function(err, vins) {
                    if (err) 
                        res.send(err); 
                    return res.json(vins);
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
    /* return complete list of vin*/
    function listVinsCave(req,res){
        ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
        if(Date.now()-timeExpiration < ownerVerified.iat){
            if(req.body.vin.owner){
                app.models.Vin.find({'owner': ownerVerified.user}, function (err, vin) {
                    if (err) 
                        res.send(err); 
                    return res.json(vin);
                });
            }
        }else{
            res.send('user expired, pleaze reconect');
        }
    }
};



var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60
var fs = require('fs');


module.exports = app => {
    return {addVinCave,updateVinCave, viewVinCave, deleteVinCave, searchVinCave, listVinsCave, addTag, deleteTag, ratingVinCave};
    
    function getImage(vin,res){//console.log(vin)
        if(vin.image){
            var file = fs.readFile(__dirname +'/../upload/' + vin.image, function read(err, data) {
                if (err) {
                    console.log(err)
                    return err
                }
                var newVin = {}
                newVin.vin = vin;
                newVin.imageBuffer = data;
                res.json(newVin)
            });
        }else{
            var newVin = {}
            newVin.vin = vin;
            res.json(newVin)
        }
    }
    
    /*add or edit if exist in array*/
    function addVinCave(req, res){
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
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
                            res.send('Le vin '+req.body.vin.name+' existe déja');
                        }
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /* edit vin*/
    function updateVinCave(req, res) {
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOneAndUpdate({'name': req.body.vin.name , 'owner': ownerVerified.user },  {$set:{'name': req.body.vin.newName,'desc':req.body.vin.desc,'price':req.body.vin.newPrice,'age':req.body.vin.age}}, {useFindAndModify: false},  function (err, vin) {
                        if (err) 
                            res.send(err); 
                        if(!vin){
                            res.send('Vin '+req.body.vin.name+' does not exist');
                        }else{
                            res.send('Vin updated');
                        }
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /* rate vin*/
    function ratingVinCave(req, res) {
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOneAndUpdate({'name': req.body.vin.vin.name , 'owner': ownerVerified.user },  {$set:{'rating':req.body.vin.vin.rating}}, {useFindAndModify: false},  function (err, vin) {
                        if (err) 
                            res.send(err); 
                        if(!vin){
                            res.send('Vin '+req.body.vin.vin.name+' does not exist');
                        }else{
                            res.send('Rating updated');
                        }
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /* add tag vin*/
    function addTag(req, res) {
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOne({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                        if (err) 
                            res.send(err); 

                        if(vin){
                            vin.tags.push(req.body.vin.newTag);
                            vin.save();
                            res.send(vin);
                        }else{
                            res.send('Vin '+req.body.vin.name+' not exist in your cave');
                        }
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /* delete tag vin*/
    function deleteTag(req, res) {
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOne({'name': req.body.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                        if (err) 
                            res.send(err); 
                        if(vin){
                            for (var index = 0; index < vin.tags.length; index++) {
                                if(vin.tags[index] == req.body.vin.newTag)
                                    vin.tags.splice(index, 1);
                            }
                            vin.save();
                            res.send(vin);
                        }else{
                            res.send('Vin '+req.body.vin.name+' not exist in your cave');
                        }
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /*return one vin in cave*/
    function viewVinCave(req, res){
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOne({'name': req.body.vin.vin.name , 'owner': ownerVerified.user}, function (err, vin) {
                        if (err) 
                            res.send(err); 
                        if (vin){
                            getImage(vin,res);
                        }else{
                            return res.send('not exist')
                        }
                        
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /*delete vin in cave*/
    function deleteVinCave(req, res){
        if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.findOneAndDelete({'name': req.body.vin.vin.name , 'owner': ownerVerified.user}, {}, function(err, vin) {
                        if (err) 
                            res.send(err);
                        res.json('Le vin ' + req.body.vin.vin.name + 'a bien été supprimé');
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /*return list of vin by point*/
    function searchVinCave(req, res){
        if(req.body.vin.owner){
            var limit = 5
            var page = req.body.vin.page-1
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.find({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user } , {tags: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user} ]})
                    .sort({ update_at: -1 })
                    .skip(page * limit) //Notice here
                    .limit(limit)
                    .exec((err, vins) => {
                    if (err) {
                        return res.json(err);
                    }
                    app.models.Vin.countDocuments({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user } , {tags: new RegExp('('+req.body.vin.key+')+', "i"), 'owner': ownerVerified.user} ]})
                    .exec((count_error, count) => {
                        if (err) {
                        return res.json(count_error);
                        }
                        return res.json({
                        total: count,
                        page: page,
                        pageSize: vins.length,
                        vins: vins
                        });
                    });
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
    /* return complete list of vin*/
    function listVinsCave(req,res){
        if(req.body.vin.owner){
            var limit = 5
            var page = req.body.vin.page-1
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.find({'owner': ownerVerified.user})
                    .sort({ dateAchat: -1 })
                    .skip(page * limit) //Notice here
                    .limit(limit)
                    .exec((err, vins) => {
                    if (err) {
                        return res.json(err);
                    }
                    app.models.Vin.countDocuments({'owner': ownerVerified.user})
                    .exec((count_error, count) => {
                        if (err) {
                        return res.json(count_error);
                        }
                        return res.json({
                        total: count,
                        page: page,
                        pageSize: vins.length,
                        vins: vins
                        });
                    });
                    });
                }



            }else{
                res.send('user expired, pleaze reconect');
            }
        }
    }
};



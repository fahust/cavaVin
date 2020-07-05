var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60;

module.exports = app => {
    return {
        addVinCommunity,
        updateVinCommunity,
        viewVinCommunity,
        deleteVinCommunity,
        searchVinCommunity,
        listVinsCommunity,
        addNote,
        deleteNote
    };
    /*add or edit if exist in array*/
    function addVinCommunity(req, res) {
        app.models.VinCommunity.find({
            'name': req.body.vin.name
        }, function (err, vin) {
            if (err)
                res.send(err);
            if (Array.isArray(vin) && vin.length <= 0) {
                vinSaved = new app.models.VinCommunity(req.body.vin);
                vinSaved.save();
                res.send('Vin created');
            } else {
                res.send('Vin ' + req.body.vin.name + ' already exist in community');
            }
        });
    }
    /* edit vin*/
    function updateVinCommunity(req, res) {
        app.models.Vin.findOneAndUpdate({
            'name': req.body.vin.name,
            'owner': req.body.vin.owner
        }, {
            'name': req.body.vin.newName,
            'price': req.body.vin.newPrice,
            'age': req.body.vin.newAge,
            'dateAchat': req.body.vin.newDateAchat,
            'tags': req.body.vin.newTags
        }, function (err, vin) {
            if (err)
                res.send(err);
            res.send('Vin updated');
        });
    }
    /* add tag vin*/
    function addNote(req, res) {
        app.models.VinCommunity.find({
            'name': req.body.vin.name
        }, function (err, vin) {
            if (err)
                res.send(err);
            if (vin) {
                var alreadyNoted = false;
                for (let index = 0; index < vin.tags.length; index++) {
                    if (vin.tags[index].owner == req.body.vin.owner)
                        alreadyNoted = true;
                }
                if (alreadyNoted == false) {
                    vin.tags.push(req.body.vin.newNote);
                    vin.save();
                    res.send('Note ' + req.body.vin.newNote + '/5 added to ' + req.body.vin.name);
                } else {
                    res.send('You have already noted ' + req.body.vin.name);
                }
            } else {
                res.send('Vin ' + req.body.vin.name + ' not exist in community');
            }
        });
    }
    /* delete tag vin*/
    function deleteNote(req, res) {
        app.models.VinCommunity.find({
            'name': req.body.vin.name
        }, function (err, vin) {
            if (err)
                res.send(err);
            if (vin) {
                for (var index = 0; index < vin.tags.length; index++) {
                    if (vin.tags[index].owner == req.body.vin.owner) {
                        delete vin.tags[index];
                        vin.save();
                        res.send('Tag ' + req.body.vin.newTag + ' deleted to ' + req.body.vin.name);
                    }
                }
            } else {
                res.send('Vin ' + req.body.vin.name + ' not exist in community');
            }
        });
    }
    /*return one vin in cave*/
    function viewVinCommunity(req, res) {
        app.models.VinCommunity.find({
            'name': req.body.vin.name
        }, function (err, vin) {
            if (err)
                res.send(err);
            return res.json(vin);
        });
    }
    /*delete vin in cave*/
    function deleteVinCommunity(req, res) {
        app.models.VinCommunity.findOneAndDelete({
            'name': req.body.vin.name,
            'owner': req.body.vin.owner
        }, {}, function (err, vin) {
            if (err)
                res.send(err);
            res.json('Le vin ' + req.body.vin.name + 'a bien été supprimé');
        });
    }
    /*return list of vin by point*/
    function searchVinCommunity(req, res) {//name: new RegExp('^' + req.body.vin.key + '$', "i")
        if(req.body.vin.owner){
            var limit = 5
            var page = req.body.vin.page-1
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.find({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i")} , {tags: new RegExp('('+req.body.vin.key+')+', "i")} ]})
                    .sort({ update_at: -1 })
                    .skip(page * limit) //Notice here
                    .limit(limit)
                    .exec((err, vins) => {
                    if (err) {
                        return res.json(err);
                    }
                    app.models.Vin.countDocuments({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i")} , {tags: new RegExp('('+req.body.vin.key+')+', "i")} ]})
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
        /*if(req.body.vin.owner){
            ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
            if(Date.now()-timeExpiration < ownerVerified.iat){
                if(req.body.vin.owner){
                    app.models.Vin.find({$or:[ {name: new RegExp('('+req.body.vin.key+')+', "i")} , {tags: new RegExp('('+req.body.vin.key+')+', "i")} ]}, function(err, vins) {
                        if (err) 
                            res.send(err); 
                        return res.json(vins);
                    });
                }
            }else{
                res.send('user expired, pleaze reconect');
            }
        }*/
    }
    /* return complete list of vin*/
    function listVinsCommunity(req, res) {
        app.models.VinCommunity.find({}, function (err, vin) {
            if (err)
                res.send(err);
            return res.json(vin);
        });
    }
};
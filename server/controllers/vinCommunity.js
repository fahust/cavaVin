module.exports = app => {
    return {addVinCommunity,updateVinCommunity, viewVinCommunity, deleteVinCommunity, searchVinCommunity, listVinsCommunity, addNote, deleteNote};
    /*add or edit if exist in array*/
    function addVinCommunity(req, res){
        app.models.VinCommunity.find({'name': req.body.name}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(!vin){
                new app.models.VinCommunity(req.body);
                //vin.save();
                res.send('Vin created');
            }else{
                res.send('Vin '+req.body.name+' already exist in community');
            }
        });
    }
    /* edit vin*/
    function updateVinCommunity(req, res) {
        app.models.Vin.findOneAndUpdate({'name': req.body.name , 'owner': req.body.owner},{'name': req.body.newName,'price':req.body.newPrice,'age':req.body.newAge,'dateAchat':req.body.newDateAchat,'tags':req.body.newTags}, function (err, vin) {
            if (err) 
                res.send(err); 
            res.send('Vin updated');
        });
    }
    /* add tag vin*/
    function addNote(req, res) {
        app.models.VinCommunity.find({'name': req.body.name}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(vin){
                var alreadyNoted = false;
                for (let index = 0; index < vin.tags.length; index++) {
                    if(vin.tags[index].owner == req.body.owner)
                        alreadyNoted = true;
                }
                if(alreadyNoted == false){
                    vin.tags.push(req.body.newNote);
                    vin.save();
                    res.send('Note '+req.body.newNote+'/5 added to '+req.body.name);
                }else{
                    res.send('You have already noted '+req.body.name);
                }
            }else{
                res.send('Vin '+req.body.name+' not exist in community');
            }
        });
    }
    /* delete tag vin*/
    function deleteNote(req, res) {
        app.models.VinCommunity.find({'name': req.body.name}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(vin){
                for (var index = 0; index < vin.tags.length; index++) {
                    if(vin.tags[index].owner == req.body.owner ){
                        delete vin.tags[index];
                        vin.save();
                        res.send('Tag '+req.body.newTag+' deleted to '+req.body.name);
                    }
                }
            }else{
                res.send('Vin '+req.body.name+' not exist in community');
            }
        });
    }
    /*return one vin in cave*/
    function viewVinCommunity(req, res){
        app.models.VinCommunity.find({'name': req.body.name}, function (err, vin) {
            if (err) 
                res.send(err); 
            return res.json(vin);
        });
    }
    /*delete vin in cave*/
    function deleteVinCommunity(req, res){
        app.models.VinCommunity.findOneAndDelete({'name': req.body.name , 'owner': req.body.owner}, {}, function(err, vin) {
            if (err) 
                res.send(err);
            res.json('Le vin ' + req.body.name + 'a bien été supprimé');
        });
    }
    /*return list of vin by point*/
    function searchVinCommunity(req, res){
        app.models.VinCommunity.find({$or:[ {name: new RegExp('^'+req.body.key+'$', "i")} , {tags: new RegExp('^'+req.body.key+'$', "i")} ]}, function(err, vins) {
            if (err) 
                res.send(err); 
            return res.json(vins);
        });
    }
    /* return complete list of vin*/
    function listVinsCommunity(req,res){
        app.models.VinCommunity.find({}, function (err, vin) {
            if (err) 
                res.send(err); 
            return res.json(vin);
        });
    }
};



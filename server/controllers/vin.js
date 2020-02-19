module.exports = app => {
    return {addVinCave,updateVinCave, viewVinCave, deleteVinCave, searchVinCave, listVinsCave, addTag, deleteTag, test};
    /*add or edit if exist in array*/
    function addVinCave(req, res){
        app.models.Vin.find({'name': req.body.name , 'owner': req.body.owner}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(!vin){
                new app.models.Vin(req.body);
                //vin.save();
                res.send('Vin created');
            }else{
                res.send('Vin '+req.body.name+' already exist');
            }
        });
    }
    /* edit vin*/
    function updateVinCave(req, res) {
        app.models.Vin.findOneAndUpdate({'name': req.body.name , 'owner': req.body.owner},{'name': req.body.newName,'price':req.body.newPrice,'age':req.body.newAge,'dateAchat':req.body.newDateAchat,'tags':req.body.newTags}, function (err, vin) {
            if (err) 
                res.send(err); 
            res.send('Vin updated');
        });
    }
    /* add tag vin*/
    function addTag(req, res) {
        app.models.Vin.find({'name': req.body.name , 'owner': req.body.owner}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(vin){
                vin.tags.push(req.body.newTag);
                vin.save();
                res.send('Tag '+req.body.newTag+' added to '+req.body.name);
            }else{
                res.send('Vin '+req.body.name+' not exist in your cave');
            }
        });
    }
    /* delete tag vin*/
    function deleteTag(req, res) {
        app.models.Vin.find({'name': req.body.name , 'owner': req.body.owner}, function (err, vin) {
            if (err) 
                res.send(err); 
            if(vin){
                for (var index = 0; index < vin.tags.length; index++) {
                    if(vin.tags[index] == req.body.newTag)
                        delete vin.tags[index];
                }
                vin.save();
                res.send('Tag '+req.body.newTag+' deleted to '+req.body.name);
            }else{
                res.send('Vin '+req.body.name+' not exist in your cave');
            }
        });
    }
    /*return one vin in cave*/
    function viewVinCave(req, res){
        app.models.Vin.find({'name': req.body.name , 'owner': req.body.owner}, function (err, vin) {
            if (err) 
                res.send(err); 
            return res.json(vin);
        });
    }
    /*delete vin in cave*/
    function deleteVinCave(req, res){
        app.models.Vin.findOneAndDelete({'name': req.body.name , 'owner': req.body.owner}, {}, function(err, vin) {
            if (err) 
                res.send(err);
            res.json('Le vin ' + req.body.name + 'a bien été supprimé');
        });
    }
    /*return list of vin by point*/
    function searchVinCave(req, res){
        app.models.Vin.find({$or:[ {name: new RegExp('^'+req.body.key+'$', "i"), 'owner': req.body.owner} , {tags: new RegExp('^'+req.body.key+'$', "i"), 'owner': req.owner} ]}, function(err, vins) {
            if (err) 
                res.send(err); 
            return res.json(vins);
        });
    }
    /* return complete list of vin*/
    function listVinsCave(req,res){
        app.models.Vin.find({'owner': req.body.owner}, function (err, vin) {
            if (err) 
                res.send(err); 
            return res.json(vin);
        });
    }
    /* return complete list of vin*/
    function test(req,res){
        //console.log(req);
        let vin = new app.models.Vin();
        vin.save();
        return res.send('Vin created');
    }
};



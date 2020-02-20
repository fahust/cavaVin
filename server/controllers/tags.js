module.exports = app => {
    return { addTagCommun, deleteTagCommun};
    /* add tag vin*/
    function addTagCommun(req, res) {
        app.models.Tags.find({'name': req.body.tag.name}, function (err, tag) {
            if (err) 
                res.send(err); 
            if(tag){
                tag = new app.models.Vin(req.body.tag);
                tag.save();
            }
        });
    }
    /* delete tag vin*/
    function deleteTagCommun(req, res) {
        app.models.Tags.findOneAndDelete({ name: req.body.tag.name }, function(err, tag) {
            if (err) throw err;
            res.json('Le tag commun a bien été supprimé');
        });
    }
    
};



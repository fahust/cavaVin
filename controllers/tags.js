module.exports = app => {
    return { addTag, deleteTag};
    /* add tag vin*/
    function addTag(req, res) {
        app.models.Tags.find({'name': req.body.name , 'owner': req.body.owner}, function (err, tag) {
            if (err) 
                res.send(err); 
            if(tag){
                tag.tags.push(req.body.newTag);
                tag.save();
                res.send('Tag '+req.body.newTag+' added to '+req.body.name);
            }else{
                res.send('Tag '+req.body.name+' not exist in your cave');
            }
        });
    }
    /* delete tag vin*/
    function deleteTag(req, res) {
        app.models.Tags.find({'name': req.body.name , 'owner': req.body.owner}, function (err, tag) {
            if (err) 
                res.send(err); 
            if(vin){
                for (var index = 0; index < tag.tags.length; index++) {
                    if(tag.tags[index] == req.body.newTag)
                        delete tag.tags[index];
                }
                tag.save();
                res.send('Tag '+req.body.newTag+' deleted to '+req.body.name);
            }else{
                res.send('tag '+req.body.name+' not exist in your cave');
            }
        });
    }
    
};



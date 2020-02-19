module.exports = app => {
    return { addTag, deleteTag};
    /* add tag vin*/
    function addTag(req, res) {
        app.models.Tags.find({'name': req.body.tag.name , 'owner': req.body.tag.owner}, function (err, tag) {
            if (err) 
                res.send(err); 
            if(tag){
                tag.tags.push(req.body.tag.newTag);
                tag.save();
                res.send('Tag '+req.body.tag.newTag+' added to '+req.body.tag.name);
            }else{
                res.send('Tag '+req.body.tag.name+' not exist in your cave');
            }
        });
    }
    /* delete tag vin*/
    function deleteTag(req, res) {
        app.models.Tags.find({'name': req.body.tag.name , 'owner': req.body.tag.owner}, function (err, tag) {
            if (err) 
                res.send(err); 
            if(vin){
                for (var index = 0; index < tag.tags.length; index++) {
                    if(tag.tags[index] == req.body.tag.newTag)
                        delete tag.tags[index];
                }
                tag.save();
                res.send('Tag '+req.body.tag.newTag+' deleted to '+req.body.tag.name);
            }else{
                res.send('tag '+req.body.tag.name+' not exist in your cave');
            }
        });
    }
    
};



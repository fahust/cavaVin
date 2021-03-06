var jwt = require('jsonwebtoken');


module.exports = app => {
    return {createUser,connectUser, checkDeleteUser,deleteUser};

    function createUser(req, res){
        app.models.User.findOne({'username': req.body.user.username}, function (err, user) {
            if (err) 
                res.send(err); 
            if(!user){
                userSaved = new app.models.User(req.body.user);
                userSaved.save();
                res.json(jwt.sign({ user: req.body.user.username ,iat:Date.now() }, 'shhhhhh'));
            }else{
                res.send('User '+req.body.user.username+' already exist');
            }
        });
    }

    function connectUser(req, res){
        app.models.User.findOne({ username: req.body.user.username }, function(err, user) {
            if (err) throw err;
        
            // test a matching password
            if(user){
                user.comparePassword(req.body.user.password, function(err, isMatch) {
                    if (err) throw err;
                    if(isMatch == true)
                        //res.send(req.body.user.username);
                        res.json(jwt.sign({ user: user.username ,iat:Date.now()  }, 'shhhhhh'));
                });
            }
        });
    }

    function checkDeleteUser(req, res){
        app.models.User.findOne({ username: req.body.user.username }, function(err, user) {
            if (err) throw err;
        
            // test a matching password
            user.comparePassword(req.body.user.password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch == true)
                    deleteUser(req, res, user._id);
            });
        });
    }

    function deleteUser(req, res, id){
        app.models.User.findOneAndDelete({ _id: id }, function(err, user) {
            if (err) throw err;
            res.json('User has been deleted');
        });
    }
};
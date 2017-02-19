var express=require('express');
var router=express.Router();
var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');


router.get('/',function (req, res, next) {
    res.json({initial:"This is initial api request"});
});

router.post('/signup',function (req, res) {
    if(!req.body.email||!req.body.password||!req.body.firstName||!req.body.lastName||!req.body.accountType){
        console.log(req.body.password);
        res.json({success:false,msg:'Enter the details man'});
    }
    else{
        var newUser=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            accountType:req.body.accountType,
            email:req.body.email,
            password:req.body.password
        });
        console.log(newUser)
        newUser.save(function (err) {
            if(err){
                console.log(err);
                res.json({success:false,msg:'The email is already in use.'});
            }
            else{
                console.log("DONE IT IS SAVED");
                res.json({success:true,msg:'User created'});

            }
        })
    }
});
function findRandomUser(callbackFunction) {
    User.findOne({firstName:"Chamath"},function (err, user) {
        if(err)console.log("Error occured");
        else{
            callbackFunction(user._id);
        }
    })
}
router.post('/create-class',function (req, res) {
    console.log(req.body);
    findRandomUser(function (currentUserId) {
        var classroom=new ClassRoom({
            name:req.body.name,
            startTime:((req.body.startTime)),
            endTime:(req.body.endTime),
            location:req.body.location,
            isDiscoverable:req.body.isDiscoverable,
            _creator:currentUserId
        });

        classroom.save(function (err) {
            console.log("**************");
            if(err){
                console.log("error occured");
                console.trace(err);
                return res.json({success:false,msg:"error in saving to database"});
            }
            return res.json({success:true});
        })
    });

});

/**
 * This is an outdated function please update this one
 */
router.post('/authenticate',function (req, res) {
    console.log("Came to this point woooow");
    User.findOne({name:req.body.name},function (err, user) {
        if(err) throw err;
        if(!user){
            return res.status(403).send({success:false,msg:"Authentication fails"});
        }
        else{
            user.comparePassword(req.body.password,function (err, isMatch) {
                if(isMatch && !err){
                    var token=jwt.encode(user,config.secret);
                    res.json({success:true,token:'JWT '+token,msg:"Authentication success"});

                }
                else{
                    return res.status(403).send({success:false,msg:"Authentication fails"});
                }
            })
        }
    })
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}),function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        console.log(headers.authorization);
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports=router;
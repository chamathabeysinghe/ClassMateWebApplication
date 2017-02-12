var express=require('express');
var router=express.Router();
var User=require('../app/models/user')
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');


router.get('/',function (req, res, next) {
    res.json({initial:"This is initial api request"});
});

router.post('/signup',function (req, res) {
    if(!req.body.name||!req.body.password){
        console.log(req.body.name);
        console.log(req.body.password);
        res.json({success:false,msg:'Enter the details man'});

    }
    else{
        var newUser=new User({
            name:req.body.name,
            password:req.body.password
        });
        newUser.save(function (err) {
            if(err){
                console.log(err);
                res.json({success:false,msg:'Enter the details'});
            }
            else{
                res.json({success:true,msg:'User created'});

            }
        })
    }
});

router.post('/authenticate',function (req, res) {
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
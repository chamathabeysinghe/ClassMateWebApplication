var express=require('express');
var router=express.Router();
var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Question=require('../app/models/Question');
var Material=require('../app/models/Material');
var Feedback=require('../app/models/Feedback');
var Lecture=require('../app/models/Lecture');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
var getToken=require('../commons/utilities');


router.post('/create-material',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    var currentUserId = user._id;
    if(user.accountType!='teacher'){
        return res.json({success:false,error:'Student can not create a material'})
    }
    var material = new Material({
        type: req.body.type,
        details: req.body.details,
        link:req.body.link,
        _lecture:req.body._lecture
    });

    material.save(function (err,material) {
        if (err) {
            console.error(err);
            return res.json({success: false, msg: "error in saving to database"});
        }
        Lecture.update({_id:req.body._lecture},{"$push":{"materials":material._id}},function (err, parent) {
            if(err)console.error(err);
            else{
                return res.json({success: true,id:material._id});
            }
        });
    });
});

router.delete('/remove-material/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var requestingUserId=decoded._id;
    console.log("Came to delete material")
    Material.findOne({_id:req.params.id})
        .populate({
            path:'_lecture',
            model:'Lecture',
            populate:{
                path:'_class',
                model:'ClassRoom'
            }
        })
        .exec(function (err, material) {
            // res.json(feedback);
            // console.log(requestingUserId);
            // console.log(material._lecture._class._teacher);
            // res.json({success:true,material:material});
            if(material._lecture._class._teacher==requestingUserId){
                console.log("Delete is here");
                Material.remove({_id:req.params.id},function (err, material) {
                    if(err){
                        return res.send(err);
                    }
                    return res.json({success:true,material:material});
                });
            }
            else{
                return res.send(err);
            }
        });
});



module.exports=router;
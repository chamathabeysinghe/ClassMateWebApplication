var express=require('express');
var router=express.Router();
var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Question=require('../app/models/Question');
var Feedback=require('../app/models/Feedback');
var Lecture=require('../app/models/Lecture');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
var getToken=require('../commons/utilities');

/**
 * create a feedback
 */
router.post('/create-feedback',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);

    var currentUserId = user._id;
    if(user.accountType=='teacher'){
        return res.json({success:false,error:'Teacher can not create a question'})
    }
    var feedback = new Feedback({
        details: req.body.details,
        semantic: req.body.semantic,
        _user: currentUserId,
        _lecture:req.body._lecture
    });
    feedback.save(function (err,feedback) {
        if (err) {
            console.error(err);
            return res.json({success: false, msg: "error in saving to database"});
        }
        Lecture.update({_id:req.body._lecture},{"$push":{"feedbacks":feedback._id}},function (err, parent) {
            if(err)console.error(err);
            else{
                return res.json({success: true,id:feedback._id});
            }
        });
        // return res.json({success: true,id:feedback._id});
    });
});

/**
 * remove a feedback
 */
router.delete('/remove-feedback/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var requestingUserId=decoded._id;
    Feedback.findOne({_id:req.params.id})
        .populate({
            path:'_lecture',
            model:'Lecture',
            populate:{
                path:'_class',
                model:'ClassRoom'
            }
        })
        .exec(function (err, feedback) {
            // res.json(feedback);
            // res.json({success:true,feedback:feedback});
            if(feedback._user==requestingUserId || feedback._lecture._class._teacher==requestingUserId){
                Feedback.remove({_id:req.params.id},function (err, feedback) {
                    if(err){
                        res.send(err);
                    }
                    res.json({success:true,feedback:feedback});
                })
            }
            else{
                res.send(err);
            }


        });

});

module.exports=router;
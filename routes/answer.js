var express=require('express');
var router=express.Router();
var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Question=require('../app/models/Question');
var Answer=require('../app/models/Answer');
var Feedback=require('../app/models/Feedback');
var Lecture=require('../app/models/Lecture');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
var getToken=require('../commons/utilities');

/**
 * post answers
 */
router.post('/answer-question',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    if(user.accountType=='student'){
        return res.json({success:false,error:'Student can not answer questions'})
    }
    var answer=new Answer({
        _question:req.body._question,
        details:req.body.details,
        link:req.body.link

    });

    answer.save(function (err, answer) {
        if(err){
            console.error(err);
            return res.json({success: false, msg: "error in saving to database"});
        }
        Question.update({_id:req.body._question},{"$push":{"answers":answer._id}},function (err, parent) {
            console.log(parent);
            if(err)console.error(err);
            else{
                return res.json({success: true,id:answer._id});
            }
        });
    });
});




module.exports=router;
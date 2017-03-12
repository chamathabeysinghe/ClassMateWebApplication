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
 * ==============================================================================================================
 * Finalized urls
 */
router.post('/sign-up',function (req, res) {
    if(!req.body.email||!req.body.password||!req.body.firstName||!req.body.lastName||!req.body.accountType){
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
        newUser.save(function (err) {
            if(err){
                res.json({success:false,msg:'The email is already in use.'});
            }
            else{
                res.json({success:true,msg:'User created'});

            }
        })
    }
});

/*
 * This is an outdated function please update this one
 */
router.post('/authenticate',function (req, res) {
    User.findOne({email:req.body.email},function (err, user) {
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


router.get('/get-class', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    var currentUserId = user._id;
    if(user.accountType=='teacher'){
        ClassRoom.find({_teacher: currentUserId}, function (err, classrooms) {
            if (err)return console.error(err);
            return res.json(classrooms);
        });
    }
    else{
        User.findOne({_id:currentUserId})
            .populate({
                path:'enrollments',
                model:ClassRoom,
            })
            .exec(function (err, user) {
                console.log(user);
                return res.json(user.enrollments);
            })

    }


});

router.post('/create-class',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var currentUserId = decoded._id;

    var classroom = new ClassRoom({
        name: req.body.name,
        startTime: ((req.body.startTime)),
        endTime: (req.body.endTime),
        location: req.body.location,
        isDiscoverable: req.body.isDiscoverable,
        _teacher: currentUserId
    });
    classroom.save(function (err) {
        if (err) {
            return res.json({success: false, msg: "error in saving to database"});
        }
        return res.json({success: true});
    })
});

router.delete('/remove-class/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var requestingUserId=decoded._id;
    ClassRoom.findOne({
        _id:req.params.id
    },function (err, classroom) {
        if(classroom._teacher==requestingUserId){
            ClassRoom.remove({_id:req.params.id},function (err, classrooms) {
                if(err){
                    res.send(err);
                }
                console.log(classrooms);
                res.json(classrooms);
            })
        }
        else{
            res.send(err);
        }
    });
});

// router.post('/create-feedback',passport.authenticate('jwt', {session: false}),function (req, res) {
//     var token = getToken(req.headers);
//     var decoded = jwt.decode(token, config.secret);
//     var currentUserId = decoded._id;
//
//     var feedback = new Feedback({
//         details: req.body.details,
//         semantic: req.body.semantic,
//         _user: currentUserId,
//         _lecture:req.body._lecture
//     });
//     feedback.save(function (err,feedback) {
//         if (err) {
//             return res.json({success: false, msg: "error in saving to database"});
//         }
//         console.log("SAVED");
//         Lecture.update({_id:req.body._lecture},{"$push":{"feedbacks":feedback._id}},function (err, parent) {
//             if(err)console.error(err);
//             else{
//                 return res.json({success: true,id:feedback._id});
//             }
//         });
//         // return res.json({success: true,id:feedback._id});
//     });
// });
//
// router.delete('/remove-feedback/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
//     var token = getToken(req.headers);
//     var decoded = jwt.decode(token, config.secret);
//     var requestingUserId=decoded._id;
//
//     Feedback.findOne({_id:req.params.id})
//         .populate({
//             path:'_lecture',
//             model:'Lecture',
//             populate:{
//                 path:'_class',
//                 model:'ClassRoom'
//             }
//         })
//         .exec(function (err, feedback) {
//             console.log(feedback);
//             // res.json({success:true,feedback:feedback});
//                 if(feedback._user==requestingUserId || feedback._class._teacher==requestingUserId){
//                     Feedback.remove({_id:req.params.id},function (err, feedback) {
//                         if(err){
//                             res.send(err);
//                         }
//                         res.json({success:true,feedback:feedback});
//                     })
//                 }
//                 else{
//                     res.send(err);
//                 }
//
//
//         });
//
// });

router.post('/create-lecture',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var currentUserId = decoded._id;

    var lecture = new Lecture({
        lectureNumber: req.body.lectureNumber,
        lectureSummary: req.body.lectureSummary,
        lectureTitle:req.body.lectureTitle,
        _class: req.body._class,
    });
    lecture.save(function (err) {
        if (err) {

            return res.json({success: false, msg: "error in saving to database"});
        }
        return res.json({success: true});
    })
});

router.get('/get-lectures/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    var currentUserId = user._id;
    var classId=req.params.id;
    if(user.accountType=='teacher'){
        Lecture
            .find({_class:classId})
            .populate('feedbacks')
            .exec(function (err, lectures) {
                if (err)return console.error(err);
                console.log(lectures);
                return res.json(lectures);
            });
    }
    else if(user.accountType=="student"){
        Lecture
            .find({_class:classId})
            .populate({
                path:'feedbacks',
                model:Feedback,
                match:{_user:currentUserId}
            })
            .exec(function (err, lectures) {
                if (err)return console.error(err);
                console.log(lectures);
                return res.json(lectures);
            });
    }


    // Lecture.find({_creator: classId}, function (err, lectures) {
    //     if (err)return console.error(err);
    //     return res.json(lectures);
    // });

});


/**
 * ==============================================================================================================
 * Finalized urls
 */

function findCallingUser(req,callbackFunction) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    User.findOne({
        email:decoded.email,
    },function (err, user) {
        if(err)console.log("Error occurred");
        else{
            console.log(user);
            callbackFunction(user._id);
        }
    })
}



router.get('/memberinfo', passport.authenticate('jwt', { session: false}),function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        console.log("DECOCSWS dATA*****************************************")
        var decoded = jwt.decode(token, config.secret);
        console.log(decoded);
        User.findOne({
            email: decoded.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});



// getToken = function (headers) {
//     if (headers && headers.authorization) {
//         var parted = headers.authorization.split(' ');
//         if (parted.length === 2) {
//             return parted[1];
//         } else {
//             return null;
//         }
//     } else {
//         return null;
//     }
// };

/**
 * ==============================================================================
 * Backend to match new user interface
 */

// function createToken(user) {
//     return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
// }

// router.post('/authenticate',function (req, res) {
//     console.log("Came to this point woooow "+req.body.email);
//     User.findOne({email:req.body.email},function (err, user) {
//         if(err) throw err;
//         if(!user){
//             console.log("no user found");
//             return res.status(403).send({success:false,msg:"Authentication fails"});
//         }
//         else{
//             user.comparePassword(req.body.password,function (err, isMatch) {
//                 if(isMatch && !err){
//                     var token=jwt.encode(user,config.secret);
//                     res.json({success:true,token:'JWT '+token,msg:"Authentication success"});
//
//                 }
//                 else{
//                     console.log("Shit happens");
//                     return res.status(403).send({success:false,msg:"Authentication fails"});
//                 }
//             })
//         }
//     })
// });

module.exports=router;
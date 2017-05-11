var express=require('express');
var router=express.Router();
var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Answer=require('../app/models/Answer');
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

/**
 * user login
 * generate a token
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
                    return res.json({success:true,token:'JWT '+token,msg:"Authentication success",accountType:user.accountType,
                        firstName:user.firstName,lastName:user.lastName});

                }
                else{
                    return res.status(403).send({success:false,msg:"Authentication fails"});
                }
            })
        }
    })
});

router.post('/enroll-student',passport.authenticate('jwt',{session:false}),function (req, res) {

    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);

    var currentUserId = user._id;
    var searchWord = (req.params.searchWord);
    var classId=req.body.classId;

    if (user.accountType=='teacher') {
        return res.json({success:false,"error":"invalid user type"});
    }

    ClassRoom.update({_id:classId},{"$push":{"enrollments":user._id}},function (err, parent) {
        if(err)console.error(err);
        else{
            User.update({_id:currentUserId},{"$push":{"enrollments":classId}},function (err, parent) {
                if(err)console.error(err);
                else{
                    return res.json({success: true});
                }
            });
        }
    });
});

router.post('/unenroll-student',passport.authenticate('jwt',{session:false}),function (req, res) {

    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);

    var currentUserId = user._id;


    var classId=req.body.classId;
    var removeUserId=req.body.removeUserId;

    ClassRoom.update({_id:classId},{"$pop":{"enrollments":removeUserId}},function (err, parent) {
        if(err)console.error(err);
        else{
            User.update({_id:removeUserId},{"$pop":{"enrollments":classId}},function (err, parent) {
                if(err)console.error(err);
                else{
                    return res.json({success: true});
                }
            });
        }
    });
});

router.get('/search-class/:searchWord',passport.authenticate('jwt',{session:false}),function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);

    var currentUserId = user._id;
    var searchWord=(req.params.searchWord);

    if(user.accountType=='teacher'){
        return res.json({success:false,"error":"invalid user type"});
    }

    ClassRoom.find({name: new RegExp(searchWord, "i")})
        .exec(function (err, classes) {
            if(err){
                return res.json(err);
            }
            return res.json(classes);
        })
});

/**
 * get the list of classes
 */
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
                return res.json(user.enrollments);
            })
    }
});

/**
 * get individual class by id
 */
router.get('/get-single-class/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);

    // ClassRoom.findOne({ _id: req.params.id}, function (err, classroom) {
    //     if (err)return console.error(err);
    //     return res.json(classroom);
    // });
    ClassRoom.findOne({_id:req.params.id}).populate('enrollments').exec(function (err, classroom) {
        if(err)return res.json(err);
        return res.json(classroom);
    });



});

/**
 * create a class
 */
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

/**
 * remove a class
 */
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
                res.json(classrooms);
            })
        }
        else{
            res.send(err);
        }
    });
});

/**
 * create a lecture
 */
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

/**
 * get an individual lecture
 */
router.get('/get-lectures/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    var currentUserId = user._id;
    var classId=req.params.id;
    if(user.accountType=='teacher'){
        Lecture
            .find({_class:classId})
            .populate('feedbacks')
            .populate('materials')
            .populate('questions')
            .populate({
                path:'questions',
                populate:{
                    path:'answers',
                    model:Answer
                }
            })
            .exec(function (err, lectures) {
                if (err)return console.error(err);
                return res.json(lectures);
            });
    }

    if(user.accountType=='student'){
        Lecture
            .find({_class:classId})
            .populate('materials')
            .populate('questions')
            .populate({
                path:'questions',
                populate:{
                    path:'answers',
                    model:Answer
                }
            })
            .populate({
                path:'feedbacks',
                model:Feedback,
                match:{_user:currentUserId}
            })
            .exec(function (err, lectures) {
                if (err)return console.error(err);
                return res.json(lectures);
            });
    }
});


/**
 * ==============================================================================================================
 * Finalized urls
 */



module.exports=router;
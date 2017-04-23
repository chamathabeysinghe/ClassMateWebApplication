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
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');


/**
 * create a material
 */
router.post('/create-material',passport.authenticate('jwt', {session: false}),function (req, res) {

    upload(req,res,function(err){
        console.log(req.file);
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        //res.json({error_code:0,err_desc:null});
    });
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

/**
 * get material
 */
router.get('/get-materials/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    var user = jwt.decode(token, config.secret);
    var currentUserId = user._id;
    var lectureId = req.params.id;
    Material
        .find({_lecture: lectureId})
        .exec(function (err, materials) {
            if (err)return console.error(err);
            console.log(materials);
            return res.json(materials);
        });
});

/**
 * remove a material
 */
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

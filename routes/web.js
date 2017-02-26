var express=require('express');
var User=require('../app/models/user');
var router=express.Router();

router.get('/login',function (req, res, next) {
    res.render('login.ejs');
});

//this route is for testing purposes
router.get('/',function (req, res, next) {
    res.render('index_old.ejs');
});
//this is for testing


router.post('/login',function (req, res, next) {
    console.log("new login"+req.body.email+req.body.password);


    User.findOne({
        email: req.body.email,
    }, function(err, user) {
        if (err){
            console.log(err);
        }
        console.log(user);
        if (!user) {
            console.log("not found the user with a match");
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            console.log("Found the user name");

            user.comparePassword(req.body.password,function (error, isMatch) {

                if(error){
                    console.log("Error occured in comparing passwords");
                }
                else if(isMatch){
                    console.log("Matching password also found");
                    req.session.user = user._id;//req.body.email;
                    res.json({success: true, msg: 'Welcome in the member area ' + user.firstName + '!'});
                    // console.log(req.session.user);
                    // return res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
                }
                else{
                    console.log("not found the user with a matching password");
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                }
            });

        }
    });
});

router.get('/dashboard',function (req, res, next) {


    if (req.session && req.session.user) { // Check if session exists
        console.log(req.session.user);
        //res.send("You are logged in "+req.session.user);
        res.render('dashboard-teacher.ejs');
    }
    else {
        console.log("Not Success");
        // res.send("No data")

    }

});
module.exports=router;
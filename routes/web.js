var express=require('express');
var router=express.Router();

router.get('/',function (req, res, next) {
    res.render('index.html');
});


router.post('/login',function (req, res, next) {
    console.log("new login "+req.body.name);
    req.session.user = req.body.name;
    console.log(req.session.user+" is registered");
    res.send("You want to login haaa???");
});

router.get('/dashboard',function (req, res, next) {
    if (req.session && req.session.user) { // Check if session exists
        console.log("Success");
        res.send("You are logged in "+req.session.user);

    }
    else {
        console.log("Not Success");
        res.send("No data")
    }
});
module.exports=router;
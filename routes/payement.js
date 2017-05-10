var express=require('express');
var router=express.Router();

var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
var getToken=require('../commons/utilities');

var stripe=require("stripe")("sk_test_mYlfi9fIY8XupeuOvpk6abcV");

router.post('/pay',function (req, res) {

    // var userToken = getToken(req.headers);
    // var user = jwt.decode(userToken, config.secret);
    //
    // if (user.accountType=='student') {
    //     return res.json({success:false,"error":"invalid user type"});
    // }

    var token=req.body.stripeToken;
    var chargeAmount=req.body.chargeAmount;
    console.log(token);
    console.log(chargeAmount);
    var charge=stripe.charges.create({
        amount:chargeAmount,
        currency:"gbp",
        source:token
    },function (err, charge) {
        if(err){
            console.log("Your card was declined");
        }
        console.log(err);
        console.log("**********************Success***************"+charge)
    });
    console.log("Payment success");
    res.redirect("http://localhost:4200/#/dashboard");

});


module.exports=router;
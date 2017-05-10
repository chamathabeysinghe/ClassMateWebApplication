var express=require('express');
var router=express.Router();

var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');

var stripe=require("stripe")("sk_test_mYlfi9fIY8XupeuOvpk6abcV");

function getToken(headers) {

        var parted = headers.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }

};



router.post('/pay',function (req, res) {
    console.log(req.body.id_token);
    var userToken = getToken(req.body.id_token);
    var user = jwt.decode(userToken, config.secret);
    console.log(user.firstName);
    if (user.accountType=='student') {
        return res.json({success:false,"error":"invalid user type"});
    }

    var token=req.body.stripeToken;
    var chargeAmount=req.body.chargeAmount;
    console.log(token);
    console.log(chargeAmount);
    var charge=stripe.charges.create({
        amount:chargeAmount,
        currency:"usd",
        source:token
    },function (err, charge) {
        if(err){
            console.log("Your card was declined");
        }
    });
    res.redirect("http://localhost:4200/#/dashboard");

});


module.exports=router;
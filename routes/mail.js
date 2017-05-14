var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

var jwt = require('jwt-simple');
var config = require('../config/database'); // get db config file
var passport = require('passport');

'use strict';
const nodemailer = require('nodemailer');

// sendMails=function () {
//     var date =
// }
router.get('/send-mail', function (req, res) {

// create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abeysinghechamath@gmail.com',
            pass: 'c++j2sej2eej2me'
        }
    });

// setup email data with unicode symbols
    var mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'umanithamarashee@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
    ;
});


module.exports = router;
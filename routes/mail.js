var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var jwt = require('jwt-simple');
var config = require('../config/database'); // get db config file
var passport = require('passport');

'use strict';
const nodemailer = require('nodemailer');


var sendMails=function () {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[d.getDay()];

    ClassRoom.find({day:day}).populate('_teacher').exec(function (err, classroom) {
        if(err){
            console.log(err);
            return
        }
        var receiverList="";
        for(var i=0;i<classroom.length;i++){
            console.log(classroom[i]._teacher.email);
            receiverList+=(classroom[i]._teacher.email+",");
        }

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
            from: '"CLassMATE"', // sender address
            to: receiverList, // list of receivers
            subject: ' Reminder ✔', // Subject line
            text: 'You have a class today', // plain text body
            html: '<b>You have a class today</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });



    });

};

module.exports = sendMails;
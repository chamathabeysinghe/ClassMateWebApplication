var assert = require('assert');
var mongoose    = require('mongoose');

var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Lecture=require('../app/models/Lecture');
var Material=require('../app/models/Material');
var Question=require('../app/models/Question');
var Feedback=require('../app/models/Feedback');
var Answer=require('../app/models/Answer');




mongoose.connect('mongodb://127.0.0.1/class-mate-database-test');
createUser();
function createUser(){
    var user=new User({
        firstName:"Chamath",
        lastName:"Abeysinghe",
        email:"abeysinghechamath@gmail.com",
        accountType:"Student",
        password:"gsn2010"
    });
    user.save(function (err) {
        if(err){
            console.trace(err);
        }
        else{
            createClass(user);

        }
    });
}

function createClass(user) {
    var class1=new ClassRoom({

        name:"Class2",
        time:new Date(),
        nextClassTime:new Date(),
        location:"Colombo",
        duration:4,
        _creator:user._id

    });
    class1.save(function (err) {
        if(err){
            console.trace(err);
        }
        else{
            createLecture(class1,user);
        }
    });
}

function createLecture(classroom,user) {
    var lecture=new Lecture({
        lectureSummary:"Summary of the lecture",
        lectureNumber:1,
        _creator:classroom._id
    });
    lecture.save(function (err) {
        if(err){
            console.trace(err);

        }
        else{
            createMaterial(lecture);
            createFeedback(lecture,user);
            createQuestion(lecture,user);
            createMaterial(lecture);

        }
    })
}

function createMaterial(lecture){
    var material=new Material({
        type:"Video",
        details:"No details",
        link:"LINK IS HERE",
        _creator:lecture._id

    });
    material.save(function (err) {
        if(err){
            console.assert(err);
        }
        else{

        }
    })
}

function createFeedback(lecture, user) {
    var feedback=new Feedback({
        details:"Not important",
        semantic:"negative",
        _creator:lecture._id,
        _owner:user._id
    });
    feedback.save(function (err) {
        if(err){
            console.assert(err);
        }
        else{

        }
    })
}

function createQuestion(lecture, user) {
    var question=new Question({
        details:"Not important",
        link:"negative",
        title:"title",
        _creator:lecture._id,
        _owner:user._id
    });
    question.save(function (err) {
        if(err){
            console.assert(err);
        }
        else{
            createAnswer(question);
        }
    })
}

function createAnswer(question) {
    var answer=new Answer({
        details:"Here are the details",
        link:"Link is here",
        _creator:question._id,
    });
    answer.save(function (err) {
        if(err){
            console.assert(err);
        }
    })
}

// describe('Moles', function() {
//     describe('Lecture()', function() {
//         it('should ', function() {
//             mongoose.connect('mongodb://127.0.0.1/class-mate-database-test');
//             createUser();
//
//
//
//         });
//     });
// });
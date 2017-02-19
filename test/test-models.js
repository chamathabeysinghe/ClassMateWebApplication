var assert = require('assert');
var mongoose    = require('mongoose');

var User=require('../app/models/user');
var ClassRoom=require('../app/models/ClassRoom');
var Lecture=require('../app/models/Lecture');
var Material=require('../app/models/Material');
var Question=require('../app/models/Question');
var Feedback=require('../app/models/Feedback');
var Answer=require('../app/models/Answer');

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
            createLecture(class1);
        }
    });
}

function createLecture(classroom) {
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

        }
    })

}



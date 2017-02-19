var assert = require('assert');
var mongoose    = require('mongoose');

var ClassRoom=require('../app/models/ClassRoom');
var Lecture=require('../app/models/Lecture');



describe('Moles', function() {
    describe('Lecture()', function() {
        it('should ', function() {
            mongoose.connect('mongodb://127.0.0.1/class-mate-database-test');
            var class1=new ClassRoom({
                name:"Class2",
                time:new Date(),
                nextClassTime:new Date(),
                location:"Colombo",
                duration:4
            });

            class1.save(function (err) {
                console.log("****************************");

                if(err) {

                    console.log("error occured in saving ");
                    console.log(err);
                    err.print();
                    return;
                }

                var lecture1=new Lecture({
                   lectureSummary:"Summary of the lecture",
                    lectureNumber:1,
                    _creator:class1._id
                });
                lecture1.save(function (err) {

                    if(err) {
                        console.log("error in saving the lecture 2");
                        console.log(err);
                    }
                    Lecture.findOne({lectureNumber:1})
                        .populate('_creator')
                        .exec(function (err, lecture) {

                            if(err)
                                console.log("error in reading the lecture");
                            console.log("The class is : "+lecture._creator.location);
                            // assert.equal(lecture._creator.name,"Class 1");
                        });
                    // Lecture.findOne({lectureNumber:1})
                    //     .populate('_creator')
                    //     .exec(function (err, lecture) {
                    //
                    //         if(err)
                    //             console.log("error in reading the lecture");
                    //         console.log("The class is : "+lecture._creator.name);
                    //         assert.equal(lecture._creator.name,"Class 1");
                    //     })
                })
            });



        });
    });
});
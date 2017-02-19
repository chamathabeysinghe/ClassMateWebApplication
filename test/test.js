// var assert = require('assert');
// var mongoose    = require('mongoose');
//
// var ClassRoom=require('../app/models/ClassRoom');
// var Lecture=require('../app/models/Lecture');
//
// mongoose.connect('mongodb://127.0.0.1/class-mate-database-test');
//
//
// Lecture.findOne({lectureNumber:1})
//     .populate('_creator')
//     .exec(function (err, lecture) {
//
//         if(err)
//             console.log("error in reading the lecture");
//         console.log("The class is : "+lecture._creator.location);
//         // assert.equal(lecture._creator.name,"Class 1");
//     });



// var mongoose = require('mongoose')
//     , Schema = mongoose.Schema
// mongoose.connect('mongodb://127.0.0.1/class-mate-database-test2');
//
// var personSchema = Schema({
//     _id     : Number,
//     name    : String,
//     age     : Number,
//     stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });
//
// var storySchema = Schema({
//     _creator : { type: Number, ref: 'Person' },
//     title    : String,
//     fans     : [{ type: Number, ref: 'Person' }]
// });
//
// var Story  = mongoose.model('Story', storySchema);
// var Person = mongoose.model('Person', personSchema);
//
// var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
//
// aaron.save(function (err) {
//     console.log("It is saved***********************************************");
//
//     if (err) return handleError(err);
//     var story1 = new Story({
//         title: "Once upon a timex.",
//         _creator: aaron._id    // assign the _id from the person
//     });
//
//     story1.save(function (err) {
//         if (err) return handleError(err);
//         // thats it!
//
//         Story
//             .findOne({ title: 'Once upon a timex.' })
//             .populate('_creator')
//             .exec(function (err, story) {
//                 if (err) return handleError(err);
//                 console.log('The creator is %s', story._creator.name);
//                 // prints "The creator is Aaron"
//             });
//
//     });
// });
//
// function handleError(err) {
//     console.trace(err)
// }

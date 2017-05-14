var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var QuestionSchema = new Schema({

    _lecture : { type: Schema.Types.ObjectId, ref: 'Lecture' },
    _user   : { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    answered:{
        type:Boolean,
        default:false
    },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],


});


module.exports = mongoose.model('Question', QuestionSchema);
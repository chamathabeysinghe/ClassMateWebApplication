var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var AnswerSchema = new Schema({

    _creator : { type: Schema.Types.ObjectId, ref: 'Question' },
    details: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required:false
    }

});


module.exports = mongoose.model('Answer', AnswerSchema);
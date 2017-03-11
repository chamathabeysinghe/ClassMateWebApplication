var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var FeedbackSchema = new Schema({

    _owner : { type: Schema.Types.ObjectId, ref: 'Lecture' },
    _creator   : { type: Schema.Types.ObjectId, ref: 'User' },

    details: {
        type: String,
        required: true
    },
    semantic: {
        type: String,
        required: false
    }

});


module.exports = mongoose.model('Feedback', FeedbackSchema);
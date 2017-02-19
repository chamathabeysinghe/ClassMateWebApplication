var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var LectureSchema = new Schema({

    _creator : { type: Schema.Types.ObjectId, ref: 'ClassRoom' },
    lectureNumber: {
        type: Number,
        required: true
    },
    lectureSummary: {
        type: String
    },
    materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]

});


module.exports = mongoose.model('Lecture', LectureSchema);
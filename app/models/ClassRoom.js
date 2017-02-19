var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var ClassRoomSchema = new Schema({

    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    nextClassTime: {
        type: Date
    },
    location: {
        type: String
    },
    isDiscoverable:{
        type:booleanValue
    },

    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
    enrollments: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('ClassRoom', ClassRoomSchema);
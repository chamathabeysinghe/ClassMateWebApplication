var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var ClassRoomSchema = new Schema({

    _teacher : { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    nextClassTime: {
        type: Date
    },
    location: {
        type: String
    },
    isDiscoverable:{
        type:Boolean
    },

    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
    enrollments: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('ClassRoom', ClassRoomSchema);
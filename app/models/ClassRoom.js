var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var ClassRoomSchema = new Schema({

    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    nextClassTime: {
        type: Date

    },
    location: {
        type: String
    },

    duration: {
        type: Number,
        required: true
    },

    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }]
});


module.exports = mongoose.model('ClassRoom', ClassRoomSchema);
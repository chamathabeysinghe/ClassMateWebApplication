var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
var MaterialSchema = new Schema({

    _lecture : { type: Schema.Types.ObjectId, ref: 'Lecture' },
    type: {
        type: String,
    },
    details: {
        type: String
    },
    link:{
        type:String,
        required:true
    }

});


module.exports = mongoose.model('Material', MaterialSchema);
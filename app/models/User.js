var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// set up a mongoose model
var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountLevel:{
        type:String,
        required:true,
        default:"free"
    },

    password: {
        type: String,
        required: true
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    classrooms: [{ type: Schema.Types.ObjectId, ref: 'ClassRoom' }],
    enrollments: [{ type: Schema.Types.ObjectId, ref: 'ClassRoom' }]
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    }
});

// UserSchema.methods adds an instance method
StudentSchema.methods.toJSON = function(){
    var student = this;
    var studentObject = student.toObject();

    return _.pick(studentObject, ['name']);
};





var Student = mongoose.model('Student', StudentSchema);

// var newUser = new User({
//     email: 'stevejobs@gmail.com'
// });

// newUser.save().then((doc)=>{
//     console.log('Saved User', doc);
// }, (e)=>{
//     console.log('Unable to save User', e);

// });

module.exports = {
    Student: Student
}
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var CompetitionSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    name:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    tier:{
        type: String,
        required: true,
        unique: false,
        minlength: 3
    },
    location:{
        type: String,
        required: true,
        unique: false
    },
    vote:{
        type: String,
        required: true,
        unique: false
    }
});

// UserSchema.methods adds an instance method
CompetitionSchema.methods.toJSON = function(){
    var competitor = this;
    var competitorObject = competitor.toObject();

    return _.pick(competitorObject, ['email', 'name','tier', 'location']);
};


CompetitionSchema.statics.findByCredentials = function(email, password){
    var User = this;

    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject)=>{
           bcrypt.compare(password, user.password, (err, res)=>{
            if(res){
                resolve(user);
            }
            else{
                reject();
            }
           });
        });
    });

};


var Competition = mongoose.model('Competition', CompetitionSchema);

// var newUser = new User({
//     email: 'stevejobs@gmail.com'
// });

// newUser.save().then((doc)=>{
//     console.log('Saved User', doc);
// }, (e)=>{
//     console.log('Unable to save User', e);

// });

module.exports = {
    Competition: Competition
}
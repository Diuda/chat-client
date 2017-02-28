var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var UserSchema = new Mongoose.Schema({
	username: {type:String, unique:true},
	password: {type:String, unique:true}
});


UserSchema.pre('save', function(next){

var user = this;

bcrypt.genSalt(10, function(err, salt){
	if(err) return next(err);

bcrypt.hash(user.password, salt, function(err, hash){
	if(err) return next(err);
	user.password = hash;
	next();
		});
	});	

});

UserSchema.methods.validatePassword = function(password, callback){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

var userModel = Mongoose.model('user', UserSchema);
module.exports = userModel;

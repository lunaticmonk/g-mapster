var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
	firstname : { type : String, required : true },
	lastname : { type : String, required : true },
	email : String,
	password : String,
	admin : Boolean,
	created_at : Date,
	updated_at : Date,
});

userschema.methods.create_hash = function(data){
		var generated_hash = require('crypto')
							.createHash('md5')
							.update(data, 'utf-8')
							.digest('hex');
		return generated_hash;
}

var User = mongoose.model('User', userschema);

module.exports = User;
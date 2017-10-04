var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var UserSchema = new Schema({
    userId    : ObjectId,
    username     : String,
    password      : String,
    email      : String
	});

	// UserSchema.methods.generateHash = function (password) {
	// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
	// };

	// // check password for valid
	// UserSchema.methods.validPassword = function(password) {
	// 	return bcrypt.compareSync(password, this.password);
	// }
var UserModel = mongoose.model('UserModel', UserSchema);


module.exports = UserModel;
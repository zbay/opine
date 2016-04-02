var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({"name": {type: String, required: true}, "email": {type: String, unique: true, required: true}, "password": {type: String, required: true}});
  
mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({"username": {type: String, required: true, unique: true}, "email": {type: String, required: true, unique: true}, "password": {type: String, required: true},
    "favorites": {default: [], type: [Schema.ObjectId]}
});
  
mongoose.model('User', UserSchema);
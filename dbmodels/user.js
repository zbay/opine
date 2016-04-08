var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({"name": {type: String, required: true}, "email": {type: String, unique: true, required: true}, "password": {type: String, required: true},
    "favorites": {default: [], type: [Schema.ObjectId]}
});
  
mongoose.model('User', UserSchema);
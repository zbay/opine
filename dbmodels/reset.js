var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ResetSchema = new Schema({"resetID": {type: String, required: true}, "email": {type: String, required: true}, 
"expiration": {type: Date, default: Date.now}});

ResetSchema.index({ expiration: 1 }, { expireAfterSeconds : 6*60*60 });

mongoose.model('Reset', ResetSchema);
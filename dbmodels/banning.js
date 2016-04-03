var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BanningSchema = new Schema({"IP": {type: String, require}, "email": String, "reason": {type: String}});

mongoose.model('Banning', BanningSchema);
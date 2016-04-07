var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BanningSchema = new Schema({"IP": String, "email": String, "reason": {type: String}});

mongoose.model('Banning', BanningSchema);
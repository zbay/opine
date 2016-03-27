var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BanningSchema = new Schema({"IP": {type: String, required: true}, "reason": {type: String}});

mongoose.model('Banning', BanningSchema);
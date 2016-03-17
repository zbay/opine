var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostingSchema = new Schema({"question": {type: String}, "timePosted": {type: Date, required: true}, "deadline": {type: Date, required: true}, 
"howToContact": {type: String, required: true}, "categories": {type: [String], required: true}, "asker": {type: String, required: true}});
  
mongoose.model('Posting', PostingSchema);
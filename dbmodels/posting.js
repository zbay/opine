var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostingSchema = new Schema({"question": {type: String}, "timePosted": {type: Date, required: true, default: Date.now}, "deadline": {type: Date, required: true}, 
"howToContact": {type: String, required: true}, "category": {type: String, required: true}, "asker": {type: String, required: true}});
PostingSchema.index({ question: "text", howToContact: "text", asker: "text"});

mongoose.model('Posting', PostingSchema);
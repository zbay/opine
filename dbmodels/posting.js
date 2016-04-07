var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostingSchema = new Schema({"question": {type: String}, "timePosted": {type: Date, required: true, default: Date.now}, "deadline": {type: String, required: true}, 
"howToContact": {type: String, required: true}, "category": {type: String, required: true}, "asker": {type: String, required: true}, "email": String, 
"editable": {type: Boolean, default: false}, "IP": {type: String, required: true}, 
    "comments": [{"text": {type: String, required: true}, "timePosted": {type: Date, required: true, default: Date.now}, "IP": {type: String, required: true}}]
});

PostingSchema.index({ question: "text", howToContact: "text", asker: "text"});

mongoose.model('Posting', PostingSchema);
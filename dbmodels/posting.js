var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostingSchema = new Schema({"question": {type: String}, "timePosted": {type: Date, required: true, default: Date.now}, "deadline": {type: Date, required: true}, 
"howToContact": {type: String, required: true}, "category": {type: String, required: true}, "asker": {type: String, required: true}, "userID": Schema.ObjectId, 
"editable": {type: Boolean, default: false}, "IP": {type: String}
});

PostingSchema.index({ question: "text", howToContact: "text", asker: "text"});
PostingSchema.index({"deadline": 1}, {expireAfterSeconds: 86400});

mongoose.model('Posting', PostingSchema);

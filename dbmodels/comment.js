var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({"text": {type: String, required: true}, "timePosted": {type: Date, required: true, default: Date.now}, "IP": String});

CommentSchema.index({ question: "text", howToContact: "text", asker: "text"});

mongoose.model('Comment', CommentSchema);
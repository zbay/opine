var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({"text": {type: String, required: true}, "timePosted": {type: Date, required: true, default: Date.now}, "IP": {type: String}, 
        "userID": Schema.ObjectId, "postID": {type: Schema.ObjectId, required: true},
        "author": String,
        "isChild": {type: Boolean, default: false}, 
        "editable": {type: Boolean, default: false}, "childComments": {default: [], type: [Schema.ObjectId]} });

CommentSchema.index({ postID: 1});

mongoose.model('Comment', CommentSchema);

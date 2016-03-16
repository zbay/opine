var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostingSchema = new Schema({"question": String, "email": String, "phone": String, "url": String, "asker": String});
  
mongoose.model('Posting', PostingSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PasswordResetSchema = new Schema({"email": {type: String, required: true}
});
  
mongoose.model('PasswordReset', PasswordResetSchema);
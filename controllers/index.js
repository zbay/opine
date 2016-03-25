function routers(app){ //all of the app's route controllers
var addPost = require("./addPost.js"); addPost(app);
var getPosts = require("./getPosts.js"); getPosts(app);
var addComment = require("./addComment.js"); addComment(app);

var public_dir = './public/';

app.get('/', function(req, res) {
  res.sendfile(public_dir + "/index.html");
});

}
module.exports = routers;
function routers(app){ //all of the app's route controllers
var addPost = require("./addPost.js"); addPost(app);
var getPosts = require("./getPosts.js"); getPosts(app);
var addComment = require("./addComment.js"); addComment(app);
}

module.exports = routers;
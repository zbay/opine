function routers(app){ //all of the app's route controllers
var addPost = require("./addPost.js"); addPost(app);
var getPosts = require("./getPosts.js"); getPosts(app);
var addComment = require("./addComment.js"); addComment(app);
var login = require("./login.js"); login(app);
var signup = require("./signup.js"); signup(app);
var deletePost = require("./deletePost.js"); deletePost(app);
var editPost = require("./editPost.js"); editPost(app);
}

module.exports = routers;
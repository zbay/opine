function routers(app){ //all of the app's API controllers
var addPost = require("./addPost.js"); addPost(app);
var retrieveData = require("./retrieveData.js"); retrieveData(app);
var addComment = require("./addComment.js"); addComment(app);
var login = require("./login.js"); login(app);
var signup = require("./signup.js"); signup(app);
var deletePost = require("./delete.js"); deletePost(app);
var editPost = require("./edit.js"); editPost(app);
var reset = require("./reset.js"); reset(app);
}

module.exports = routers;
var Redux = require("redux");
var initialState = require("./initialState");
var LoginReducer = require("./reducers/reducer_login.js");

var rootReducer = Redux.combineReducers({
    loggedIn: LoginReducer
});
module.exports = Redux.createStore(rootReducer, initialState());
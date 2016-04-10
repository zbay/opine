var Redux = require("redux");
var initialState = require("./initialState");
var LoginReducer = require("./reducers/reducer_login.js");
var NavigationReducer = require("./reducers/reducer_navigation.js");

var rootReducer = Redux.combineReducers({
    loggedIn: LoginReducer,
    navigation: NavigationReducer
});
module.exports = Redux.createStore(rootReducer, initialState());
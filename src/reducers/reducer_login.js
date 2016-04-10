var C = require("../constants"),
    initialState = require("../initialState");

module.exports = function(state, action){
    var newState = Object.assign({},state); // sloppily copying the old state
    switch(action.type){
        case C.LOGIN:
            newState["loggedIn"] = true;
            newState["userID"] = action.userID;
            return newState;
        case C.LOGOUT:
            newState["loggedIn"] = false;
            newState["userID"] = null;
            return newState;
        default: return state || initialState().loggedIn;
    }
};
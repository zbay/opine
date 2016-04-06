var C = require("../constants"),
    initialState = require("../initialState");

module.exports = function(state, action){
    var newState = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
    switch(action.type){
        case C.LOGIN:
            newState[C.LOGGEDIN] = true;
            return newState;
        case C.LOGOUT:
            newState[C.LOGGEDIN] = false;
            return newState;
        default: return state || initialState().loggedIn;
    }
};
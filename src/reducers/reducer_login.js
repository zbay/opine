var C = require("../constants"),
    initialState = require("../initialState");

module.exports = function(state, action){
    var newState = Object.assign({},state); // sloppily copying the old state
    switch(action.type){
        case C.LOGIN:
            newState[C.LOGGEDIN] = true;
            newState[C.EMAIL] = action.email;
            return newState;
        case C.LOGOUT:
            newState[C.LOGGEDIN] = false;
            newState[C.EMAIL] = null;
            return newState;
        default: return state || initialState().loggedIn;
    }
};
var C = require("../constants"),
    initialState = require("../initialState");

module.exports = function(state, action){
    var newState = Object.assign({},state); // sloppily copying the old state
    switch(action.type){
        case C.NAVIGATE:
            newState["justChanged"] = true;
            newState["nonCategoryChange"] = action.nonCategoryChange;
            return newState;
        case C.END_NAVIGATE:
            newState["justChanged"] = false;
            return newState;
        default: return state || initialState().navigation;
    }
};
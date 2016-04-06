var constants = require("../constants");

module.exports = {
    login: function(){
        // A normal action creator, returns a simple object describing the action.
        return {type:constants.LOGIN};
    },
    logout: function(){
        return {type:constants.LOGOUT}
    }
};
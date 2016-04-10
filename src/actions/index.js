var constants = require("../constants");

module.exports = {
    login: function(userID){
        // A normal action creator, returns a simple object describing the action.
        return {type:constants.LOGIN, userID: userID};
    },
    logout: function(){
        return {type:constants.LOGOUT}
    }
};
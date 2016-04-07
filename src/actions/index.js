var constants = require("../constants");

module.exports = {
    login: function(email){
        // A normal action creator, returns a simple object describing the action.
        return {type:constants.LOGIN, email:email};
    },
    logout: function(){
        return {type:constants.LOGOUT}
    }
};
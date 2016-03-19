var mongoose = require('mongoose');
var Posting = require(process.cwd() + "../dbmodels/posting.js"); Posting = mongoose.model("Posting");
export const FETCH_POSTS = 'FETCH_POSTS';

export function fetchWeather(criteria) {
    //add db retrieval and stuff
        switch(criteria){
            case "all":

                break;
            case "category":

                break;
            case "search":

                break;
            default:
        }
  return {
    type: FETCH_POSTS,
    payload: null
  };
}
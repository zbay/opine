import axios from 'axios';
export const NEW_POST = 'NEW_POST';

export function fetchWeather(criteria) {
    //add db retrieval and stuff
        switch(criteria){
            case "all":
                var postingStream = Posting.find().sort({"timePosted": -1}).limit(50).stream();
                postingStream.on("data", function(doc){
                    postings.push(doc);
                });
                postingStream.on("end", function(){
                    res.json({"postings": postings});
                });
                break;
            case "category":
                Posting.find();
                break;
            case "search":
                //Posting.find();
                break;
            default:
        }
  return {
    type: FETCH_POSTS,
    payload: null
  };
}
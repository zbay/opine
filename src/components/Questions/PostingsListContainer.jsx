var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var axios = require('axios');
var PostingsList = require("./Stateless/PostingsList");
var PageBar = require("../Navigation/PageBar");
var ReactRedux = require('react-redux');

var PostingsListContainer = React.createClass({
    propTypes: {
      criteria: React.PropTypes.string.isRequired,
      category: React.PropTypes.string,
      search: React.PropTypes.string,
      page: React.PropTypes.string.isRequired,
    },
    getInitialState: function(){
      return {
          postings: [], 
          visibleForm: false,
          addendum: ""
      };  
    },
    componentWillMount: function(){
        let that = this;
        var thisAddendum = "";
        if(that.props.criteria != "all" && that.props.criteria != "myPosts" && that.props.criteria != "favorites"){
            if(that.props.criteria == "category"){
                thisAddendum = that.props.category + "/";
                this.setState({addendum: thisAddendum});
            }
            if(that.props.criteria == "search"){
                thisAddendum = that.props.search + "/";
                this.setState({addendum: thisAddendum});
            }
        }
        switch(that.props.criteria){
            case "all":
                 that.retrieveAll(Number(that.props.page));
                break;
            case "category":
                that.retrieveCategory(that.props.category, Number(that.props.page));
                break;
            case "search":
                that.retrieveSearch(that.props.search, Number(that.props.page));
                break;
            case "myPosts":
                if(!that.props.loggedIn){
                    BrowserHistory.push("/login");
                }
                else{
                that.retrieveMine(Number(that.props.page));
                }
                break;
            case "favorites":
                that.retrieveFavorites();
            default:
        }
    },
    componentWillReceiveProps: function(nextProps){
         let that = this;
          var thisAddendum = "";
        if(nextProps.criteria != "all"){
            if(nextProps.criteria == "category"){
                thisAddendum = nextProps.category + "/";
            }
            if(nextProps.criteria == "search"){
                thisAddendum = nextProps.search + "/";
            }
            that.setState({addendum: thisAddendum});
        }
        switch(nextProps.criteria){
            case "all":
                 that.retrieveAll(Number(nextProps.page));
                break;
            case "category":
                that.retrieveCategory(nextProps.category, Number(nextProps.page));
                break;
            case "search":
                that.retrieveSearch(nextProps.search, Number(nextProps.page));
                break;
            case "myPosts":
                that.retrieveMine(Number(that.props.page));
                break;
            case "favorites":
                that.retrieveFavorites();
            default:
        }       
    },
    retrieveAll: function(page){ //get all questions, from the server
        let that = this;
        let pageData = {"page": page, "userID": that.props.userID};
        axios.post("/allPostings", pageData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveMine: function(page){
        if(this.props.loggedIn){
         let that = this;
         let meData = {"page": page, "userID": that.props.userID};
         axios.post("/myPostings", meData)
         .then(function(response){
             that.setState({postings: response.data.postings});
         });   
        }
        else{
            BrowserHistory.push("/login");
        }
    },
    retrieveCategory: function(category, page){ //get all questions in a category, from the server
        let that = this;
          let queryData = {"category": category, "page": page, "userID": that.props.userID};
        axios.post("/categoryPostings", queryData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(searchQuery, page){ // get search results from the server
        let that = this;
          let queryData = {"searchQuery": searchQuery, "page": page, "userID": that.props.userID};
        axios.post("/searchPostings", queryData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveFavorites: function(){ // retrieve user's favorites
     if(this.props.loggedIn){
        let that = this;
        let userData = {"userID": that.props.userID};
            axios.post("/favoritePostings", userData)
            .then(function(response){
            if(!response.data.error){
              that.setState({postings: response.data.postings});   
            }
            else{
                console.log(response.data.error);
            }
        });         
     }
     else{
         BrowserHistory.push("/login");
     }
    },
    render: function(){
        return (
        <div id="postListContainer">
        <PostingsList postings={this.state.postings} page={this.props.page} />
        {this.props.criteria === "favorites" ? (<span></span>): (<PageBar page={this.props.page} criteria={this.props.criteria} hasNext={this.state.postings.length > 0} addendum={this.state.addendum}/>)}
        </div>);
    }
});

var mapStateToProps = function(state){
    console.log("state: " + JSON.stringify(state));
    return {loggedIn:state.loggedIn.loggedIn, userID: state.loggedIn.userID};
};

module.exports = ReactRedux.connect(mapStateToProps)(PostingsListContainer);

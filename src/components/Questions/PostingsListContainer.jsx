var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var axios = require('axios');
var PostingsList = require("./Stateless/PostingsList");
var PageBar = require("../Navigation/PageBar");
var Refresher = require("../Navigation/Refresher");
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
        this.setAddendum(this.props.criteria, this.props.category, this.props.search);
        this.loadData(this.props.criteria, this.props.page, this.props.category, this.props.search);
    },
    componentWillReceiveProps: function(nextProps){
        this.setAddendum(nextProps.criteria, nextProps.category, nextProps.search);
        this.loadData(nextProps.criteria, nextProps.page, nextProps.category, nextProps.search);
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
    reload: function(){
      this.loadData(this.props.criteria, this.props.page);  
    },
    loadData: function(criteria, page, category, search){
        let that = this;
        switch(criteria){
            case "all":
                 that.retrieveAll(Number(page));
                break;
            case "category":
                that.retrieveCategory(category, Number(page));
                break;
            case "search":
                that.retrieveSearch(search, Number(page));
                break;
            case "myPosts":
                if(!that.props.loggedIn){
                    BrowserHistory.push("/login");
                }
                else{
                that.retrieveMine(Number(page));
                }
                break;
            case "favorites":
                that.retrieveFavorites();
            default:
        }   
    },
    setAddendum: function(criteria, category, search){
        let that = this;
        var thisAddendum = "";
        if(criteria != "all" && criteria != "myPosts" && criteria != "favorites"){
            if(criteria == "category"){
                thisAddendum = category + "/";
                this.setState({addendum: thisAddendum});
            }
            if(criteria == "search"){
                thisAddendum = search + "/";
                this.setState({addendum: thisAddendum});
            }
        }  
    },
    render: function(){
        return (
        <div id="postListContainer">
        <Refresher reload={this.reload} />
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

var React = require('react');
var axios = require('axios');
var BrowserHistory = require('react-router/lib/browserHistory');
var PostingsList = require("./Stateless/PostingsList");
var ActionBar = require("../Navigation/ActionBar");
var PageBar = require("../Navigation/PageBar");
var localStorage = window.localStorage;

module.exports = React.createClass({
    propTypes: {
      criteria: React.PropTypes.string.isRequired,
      category: React.PropTypes.string,
      search: React.PropTypes.string,
      page: React.PropTypes.string.isRequired
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
        if(that.props.criteria != "all" && that.props.criteria != "favorites"){
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
            case "favorites":
                that.retrieveFavorites(Number(that.props.page));
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
            case "favorites":
                that.retrieveFavorites(Number(nextProps.page));
            default:
        }       
    },
    retrieveAll: function(page){ //get all questions, from the server
        let that = this;
        let pageData = {"page": page};
        axios.post("/allPostings", pageData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveCategory: function(category, page){ //get all questions in a category, from the server
        let that = this;
          let queryData = {"category": category, "page": page};
        axios.post("/categoryPostings", queryData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(searchQuery, page){ // get search results from the server
        let that = this;
          let queryData = {"category": searchQuery, "page": page};
        axios.post("/searchPostings", queryData)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveFavorites: function(page){ //if "favorites" cookie exists, use their IDs to fetch the rest of their data
    if(localStorage){
        let that = this;
          let questions = {"favorites": JSON.parse(localStorage.getItem("favorites"))};
        if(questions && JSON.stringify(questions).length){
            axios.post("/favoritePostings", questions)
            .then(function(response){
            if(!response.data.error){
              that.setState({postings: response.data.postings});   
            }
            else{
                console.log(response.data.error);
            }
        });         
        }     
    }
    },
    render: function(){
        return (
        <div id="postListContainer">
        <ActionBar newPostsRender={this.newPostsRender}/>
        <PostingsList postings={this.state.postings} page={this.props.page} />
        {this.props.criteria === "favorites" ? (<span></span>): (<PageBar page={this.props.page} criteria={this.props.criteria} hasNext={this.state.postings} addendum={this.state.addendum}/>)}
        </div>);
    },
newPostsRender: function(redirectCategory){
    if(this.props.criteria === "category"){
        BrowserHistory.push("/category/" + redirectCategory + "/1");   
    }
    else{
if(this.props.criteria !== "favorites"){
 BrowserHistory.push("/" + this.props.criteria + "/" + this.state.addendum + "1");   
}
}
}
});
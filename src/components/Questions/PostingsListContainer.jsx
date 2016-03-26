var React = require('react');
var axios = require('axios');
var HashHistory = require('react-router/lib/hashHistory');
var PostingsList = require("./Stateless/PostingsList");
var ActionBar = require("../Navigation/ActionBar");
var PageBar = require("../Navigation/PageBar");

module.exports = React.createClass({
    propTypes: {
      criteria: React.PropTypes.string.isRequired,
      category: React.PropTypes.string,
      search: React.PropTypes.string,
      page: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        let that = this;
        var thisAddendum = "";
        if(that.props.criteria != "all" && that.props.criteria != "favorites"){
            if(that.props.criteria == "category"){
                thisAddendum = that.props.category + "/";
            }
            if(that.props.criteria == "search"){
                thisAddendum = that.props.search + "/";
            }
        }
      return {postings: [], 
          visibleForm: false,
          addendum: thisAddendum
      };  
    },
    componentWillMount: function(){
        let that = this;
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
    retrieveAll: function(page){
        let that = this;
        axios.get("/allPostings/" + page)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveCategory: function(category, page){
        let that = this;
        axios.get("/categoryPostings/" + category + "/" + page)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(searchQuery, page){
        let that = this;
        axios.get("/searchPostings/" + searchQuery + "/" + page)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveFavorites: function(page){
        let that = this;
        let questions = {"favorites": JSON.parse(localStorage.getItem("favorites")), "page": page};
        console.log("fave postings: " + JSON.stringify(questions));
        axios.post("/favoritePostings", questions)
        .then(function(response){
            if(!response.data.TypeError){
              that.setState({postings: response.data.postings});   
            }
            else{
                console.log(response.data.TypeError);
            }
        });      
    },
    render: function(){
        return (
        <div id="postListContainer">
        <ActionBar visibleForm={this.state.visibleForm} newPostsRender={this.newPostsRender}/>
        <PostingsList postings={this.state.postings} />
       <PageBar page={Number(this.props.page)} criteria={this.props.criteria} hasNext={this.state.postings.length > 0} addendum={this.state.addendum}/>
        </div>);
    },
newPostsRender: function(){
  HashHistory.push("/" + this.props.criteria + "/" + this.state.addendum + "1");
}
});
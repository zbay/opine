var React = require('react');
var axios = require('axios');
var HashHistory = require('react-router/lib/hashHistory');
var Posting = require("./dumb/posting");
var PostingsList = require("./dumb/postingslist");
var ToggleFormButton = require("./dumb/toggleformbutton");
var NewPostForm = require("./newpostform");
var BrowseBar = require("./browsebar");

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
        if(that.props.criteria != "all"){
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
            default:
        }       
    },
    retrieveAll: function(page){
        let that = this;
        axios.get("/allPostings/" + page)
        .then(function(response){
            that.setState({postings: response.data});
        });
    },
    retrieveCategory: function(category, page){
        let that = this;
        axios.get("/categoryPostings/" + category + "/" + page)
        .then(function(response){
              console.log("searchResponse: " + JSON.stringify(response.data));
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(searchQuery, page){
        let that = this;
        console.log("searching: " + searchQuery);
        axios.get("/searchPostings/" + searchQuery + "/" + page)
        .then(function(response){
            console.log("searchResponse: " + JSON.stringify(response.data));
            that.setState({postings: response.data.postings});
        });
    },
    toggleForm: function(){
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    },
    render: function(){
        return (
        <div id="postListContainer">
        <ToggleFormButton visible={this.state.visibleForm} toggleVisible={this.toggleForm} />
        <br /><br />
        <NewPostForm visible={this.state.visibleForm} newPostsRender={this.newPostsRender} />
        <PostingsList postings={this.state.postings} />
        <BrowseBar page={Number(this.props.page)} criteria={this.props.criteria} hasNext={this.state.postings.length > 0} addendum={this.state.addendum}/>
        </div>);
    },
newPostsRender: function(){
  HashHistory.push("/" + this.props.criteria + "/" + this.state.addendum + "1");
}
});
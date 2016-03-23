var React = require('react');
var axios = require('axios');
var Posting = require("./dumb/posting");
var PostingsList = require("./dumb/postingslist");
var ToggleFormButton = require("./dumb/toggleformbutton");
var NewPostForm = require("./newpostform");
var BrowseBar = require("./browsebar");

module.exports = React.createClass({
    propTypes: {
      criteria: React.PropTypes.string.isRequired,
      category: React.PropTypes.string,
      searchQuery: React.PropTypes.string,
      page: React.PropTypes.number.isRequired,
    },
    getInitialState: function(){
        let that = this;
        var thisAddendum = "";
        if(that.props.criteria != "all"){
            if(that.props.criteria == "category"){
                thisAddendum = that.props.category + "/";
            }
            if(that.props.criteria == "search"){
                thisAddendum = that.props.searchQuery + "/";
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
                 that.retrieveAll(that.props.page);
                break;
            case "category":
                that.retrieveCategory(that.props.category, that.props.page);
                break;
            case "search":
                that.retrieveSearch(that.props.searchQuery, that.props.page);
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
                thisAddendum = nextProps.searchQuery + "/";
            }
            that.setState({addendum: thisAddendum});
        }
        switch(nextProps.criteria){
            case "all":
                 that.retrieveAll(nextProps.page);
                break;
            case "category":
                that.retrieveCategory(nextProps.category, nextProps.page);
                break;
            case "search":
                that.retrieveSearch(nextProps.searchQuery, nextProps.page);
                break;
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
        <NewPostForm visible={this.state.visibleForm} />
        <PostingsList postings={this.state.postings} />
        <BrowseBar page={this.props.page} criteria={this.props.criteria} hasNext={this.state.postings.length > 0} page={this.props.page} addendum={this.state.addendum}/>
        </div>);
    }
});
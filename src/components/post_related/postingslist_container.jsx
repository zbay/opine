var React = require('react');
var axios = require('axios');
var Posting = require("./dumb/posting");
var PostingsList = require("./dumb/postingslist");
var ToggleFormButton = require("./dumb/toggleformbutton");
var NewPostForm = require("./newpostform");
var BrowseBar = require("./browsebar");

module.exports = React.createClass({
    getInitialState: function(){
      return {postings: [], 
          visibleForm: false
      };  
    },
    componentWillMount: function(){
        let that = this;
        switch(this.props.criteria){
            case "all":
                 that.retrieveAll(that.props.page);
                break;
            case "category":
                that.retrieveCategory(that.props.category);
                break;
            case "search":
                that.retrieveSearch(that.props.searchQuery);
                break;
            default:
        }
    },
    componentWillReceiveProps: function(nextProps){
         let that = this;
        switch(nextProps.criteria){
            case "all":
                 that.retrieveAll(nextProps.page);
                break;
            case "category":
                that.retrieveCategory(nextProps.category, (nextProps.page));
                break;
            case "search":
                that.retrieveSearch(nextProps.searchQuery, (nextProps.page));
                break;
            default:
        }       
    },
    retrieveAll: function(page){
        console.log("retrieving: " + page);
        let that = this;
        axios.get("/allPostings/" + page)
        .then(function(response){
            console.log(response.data.postings);
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
            console.log(response.data.postings);
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
    getPostQuantity: function(){
        axios.get("");
    },
    render: function(){
        return (
        <div id="postListContainer">
        <ToggleFormButton visible={this.state.visibleForm} toggleVisible={this.toggleForm} />
        <NewPostForm visible={this.state.visibleForm} />
        <PostingsList postings={this.state.postings} />
        <BrowseBar page={this.props.page} criteria={this.props.criteria} hasNext={this.state.postings.length > 0} page={this.props.page}/>
        </div>);
    }
});
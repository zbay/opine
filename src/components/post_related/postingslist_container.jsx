var React = require('react');
var axios = require('axios');
var Posting = require("./dumb/posting");
var PostingsList = require("./dumb/postingslist");
var ToggleFormButton = require("./dumb/toggleformbutton");
var NewPostForm = require("./newpostform");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var BrowseButtons = require("./browsebuttons");

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
    componentWillReceiveProps: function(){
         let that = this;
        switch(this.props.criteria){
            case "all":
                 that.retrieveAll(that.props.page-1);
                break;
            case "category":
                that.retrieveCategory(that.props.category, (that.props.page));
                break;
            case "search":
                that.retrieveSearch(that.props.searchQuery, (that.props.page));
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
    render: function(){
        return (
        <div id="postListContainer">
        <ToggleFormButton visible={this.state.visibleForm} toggleVisible={this.toggleForm} />
        <NewPostForm visible={this.state.visibleForm} />
        <PostingsList postings={this.state.postings} />
        <button><Link to={"/" + this.props.criteria + "/" + (Number(this.props.page)-1)}>Page {"" + (Number(this.props.page)-1)}</Link></button><button><Link to={"/" + this.props.criteria + "/" + (Number(this.props.page)+1)}>Page {"" + (Number(this.props.page)+1)}</Link></button>
        </div>);
    }
});
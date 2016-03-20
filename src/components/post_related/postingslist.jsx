var React = require('react');
var axios = require('axios');
var Posting = require("./posting");
var ToggleFormButton = require("./toggleformbutton");
var NewPostForm = require("./newpostform");


module.exports = React.createClass({
    getInitialState: function(){
      return {postings: [], 
          visibleForm: false
      };  
    },
    componentWillMount: function(){
          console.log("current page: " + this.props.page);
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
        console.log("current page: " + this.props.page);
         let that = this;
        switch(this.props.criteria){
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
    retrieveAll: function(page){
        let that = this;
        axios.get("/allPostings/" + page)
        .then(function(response){
            console.log(response.data.postings);
            that.setState({postings: response.data.postings});
        });
    },
    retrieveCategory: function(category, page){
        let that = this;
        axios.get("/category/" + category + "/" + page)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(searchQuery, page){
        let that = this;
        axios.get("/search/" + searchQuery + "/" + page)
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
        <div id="postingsList">
        <ToggleFormButton visible={this.state.visibleForm} toggleVisible={this.toggleForm} />
        <NewPostForm visible={this.state.visibleForm} />
        <div id="postingsList">
        {this.renderPostings()}
        </div></div>);
    },
    renderPostings: function(){
        return (this.state.postings.map(function(posting){
            return (<Posting key={posting._id} postingData={posting} />)
        }));
    }
});
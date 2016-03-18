var React = require('react');
var axios = require('axios');
var Posting = require("./posting");

module.exports = React.createClass({
    getInitialState: function(){
      return {postings: []};  
    },
    componentWillMount: function(){
        let that = this;
        switch(this.props.criteria){
            case "all":
                 that.retrieveAll();
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
    retrieveAll: function(){
        let that = this;
        axios.get("/allPostings")
        .then(function(response){
            console.log(response.data.postings);
            that.setState({postings: response.data.postings});
        });
    },
    retrieveCategory: function(category){
        let that = this;
        axios.get("/category/" + category)
        .then(function(response){
            that.setState({postings: response.data.postings});
        });
    },
    retrieveSearch: function(query){
        let that = this;
        axios.get("/search/" + query)
        .then(function(response){
            console.log(response.data.postings);
            that.setState({postings: response.data.postings});
        });
    },
    render: function(){
        return (<div id="postingsList">
        {this.renderPostings()}
        </div>);
    },
    renderPostings: function(){
        return (this.state.postings.map(function(posting){
            return (<Posting key={posting._id} postingData={posting} />)
        }));
    }
});
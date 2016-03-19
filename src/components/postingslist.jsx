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
        <div>
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
var React = require('react');
var Jumbotron = require("./jumbotron");
var PostingsList = require("./postingslist");
var ToggleFormButton = require("./toggleformbutton");
var NewPostForm = require("./newpostform");

module.exports = React.createClass({
    getInitialState: function(){
      return{visibleForm: false};  
    },
    render: function(){
        return (<div><Jumbotron />
        <ToggleFormButton visible={this.state.visibleForm} toggleVisible={this.toggleForm} />
        <NewPostForm visible={this.state.visibleForm} />
        <PostingsList criteria="all" />
        </div>);
    },
    toggleForm: function(){
        console.log("toggling form");
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    }
});
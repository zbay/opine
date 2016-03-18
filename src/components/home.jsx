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
        <ToggleFormButton visible={this.state.visibleForm} />
        <NewPostForm visible={this.state.visibleForm} />
        <PostingsList criteria="all" />
        Testing homepage 123</div>);
    }
});
"use strict";
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var CategorySelector = require("./CategorySelector");
var NewPostForm = require("../Questions/NewPostForm");

module.exports = React.createClass({
    propTypes: {
      newPostsRender: React.PropTypes.func
    },
    getInitialState: function(){
        return {
            search: "",
            visibleForm: false
        }
    },
    render: function(){
        return (
        <div>
        <div id="actionBar">
        <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-6 vertCenter">
        <label>Browse by category: </label>&nbsp;
        <CategorySelector />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 vertCenter">
        <form onSubmit={this.submitSearch}>
        <input name="search" placeholder="Search" value={this.state.search} onChange={this.onChange}/>
         <button type="submit" id="goButton">Go</button>
        </form>
        </div>
        </div>
        <div className="row" id="toggleColumn">
        <button id="toggleForm" onClick={this.toggleForm}>{this.state.visibleForm ? "Hide Question Form" : "Ask Something"}</button>
        </div>
        </div>
        <br />
        <NewPostForm visible={this.state.visibleForm} newPostsRender={this.props.newPostsRender} />
        </div>);
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    submitSearch: function(e){
        e.preventDefault();
        let that = this;
        if(that.state.search.length > 0){
           BrowserHistory.push("/search/" + that.state.search + "/1");   
        }
    },
    toggleForm: function(){
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    },
    });
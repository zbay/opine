"use strict";
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var CategorySelector = require("./CategorySelector");
var NewPostForm = require("../Questions/NewPostForm");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

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
        <div className="col-sm-2 col-md-2 col-lg-4" id="toggleColumn">
        <button id="toggleForm" onClick={this.toggleForm}>{this.state.visibleForm ? "Hide Question Form" : "Ask Something"}</button>
        </div>
        <div className="col-sm-5 col-md-5 col-lg-4" id="categoryColumn">
        <label>Browse by category: </label>&nbsp;
        <CategorySelector />
        </div>
        <div className="col-sm-5 col-md-5 col-lg-4" id="searchColumn">
        <form onSubmit={this.submitSearch}>
        <input name="search" placeholder="Search" value={this.state.search} onChange={this.onChange}/>
        <button type="submit">Go</button>
        </form>
        </div>
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
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var CategorySelector = require("./CategorySelector");
var NewPostForm = require("../Questions/NewPostForm");
var Link = require('react-router').Link;

module.exports = React.createClass({
    propTypes: {
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
        <div className="col-sm-3 col-md-3 col-lg-3 vertCenter" id="toggleColumn">
            <button>{!this.props.loggedIn ? (<Link to="/login">Log In</Link>) : (<Link to="/logout">Log Out</Link>)}</button>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3 vertCenter">
            <button id="toggleForm" onClick={this.toggleForm}>{this.state.visibleForm ? "Hide Question Form" : "Ask Something"}</button>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3 vertCenter">
        <label>Browse by category: </label>&nbsp;
        <CategorySelector />
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3 vertCenter">
        <form onSubmit={this.submitSearch}>
        <input name="search" placeholder="Search" id="searchField" value={this.state.search} onChange={this.onChange}/>
         <button type="submit" id="goButton">Go</button>
        </form>
        </div>
        </div>
        </div>
        <br />
        <NewPostForm visible={this.state.visibleForm} />
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
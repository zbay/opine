var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var CategorySelector = require("./CategorySelector");
var NewPostForm = require("../Questions/NewPostForm");
var Link = require('react-router').Link;
var ReactRedux = require('react-redux');

var ActionBar = React.createClass({
    getInitialState: function(){
        return {
            search: "",
            visibleForm: false
        }
    },
    render: function(){
        console.log("loggedIn: " + JSON.stringify(this.props.loggedIn));
        return (
        <div>
        <div id="actionBar">
        <div className="row">
        <div className="col-sm-2 col-md-2 col-lg-2 vertCenter" id="toggleColumn">
            <button>{this.props.loggedIn ?  (<Link to="/logout">Log Out</Link>) : (<Link to="/login">Log In</Link>)}</button>
        </div>
        <div className="col-sm-2 col-md-2 col-lg-2 vertCenter">
            <button id="toggleForm" onClick={this.toggleForm}>{this.state.visibleForm ? "Hide Question Form" : "Ask Something"}</button>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4 vertCenter">
        <label>Browse by category: </label>&nbsp;
        <CategorySelector loggedIn={this.props.loggedIn}/>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4 vertCenter">
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
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, email:state.loggedIn.email};
};
module.exports = ReactRedux.connect(mapStateToProps)(ActionBar);
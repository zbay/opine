var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var CategorySelector = require("./CategorySelector");
var NewPostForm = require("../Questions/NewPostForm");
var actions = require("../../actions"); //Redux actions
var ReactRedux = require('react-redux');

var ActionBar = React.createClass({
    getInitialState: function(){
        return {
            search: "",
            visibleForm: false
        }
    },
    componentWillReceiveProps: function(nextProps){
        let that = this;
        if(nextProps.justChanged){
            that.setState({visibleForm: false});
            that.props.endNavigate();
        }
    },
    render: function(){
        return (
        <div>
        <div id="actionBar">
        <div className="row">
        <div className="col-sm-2 col-md-2 col-lg-2 vertCenter" id="toggleColumn">
        {this.props.loggedIn ? (<button onClick={this.logout}>Log Out</button>): (<button onClick={this.login}>Log In</button>)}
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
           that.props.navigate();
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
    login: function(){
        this.props.navigate();
        BrowserHistory.push("/login");  
    },
    logout: function(){
        this.props.navigate();
        BrowserHistory.push("/logout");  
    }
    });
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID, justChanged: state.navigation.justChanged};
};
var mapDispatchToProps = function(dispatch){
    return {
        navigate: function(){ 
            dispatch(actions.navigate(true)); },
        endNavigate: function(){
            dispatch(actions.endNavigate());
        }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ActionBar);
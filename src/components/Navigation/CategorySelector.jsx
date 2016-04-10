"use strict";
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');
var ReactRedux = require('react-redux');
var actions = require("../../actions");

var CategorySelector = React.createClass({
    getInitialState: function(){
        return{
          category: "None"  
        };
    },
    componentWillReceiveProps: function(nextProps){
        let that = this;
      if(nextProps.nonCategoryChange){
          that.setState({category: "None"});
      }  
    },
    render: function(){
        let that = this;
        if(that.props.loggedIn){
        return (<select id="catBrowse" name="category" onChange={that.onChange} value={that.state.category}>
            <option value="None">---</option>
            <option value="All">All</option>
            <option value="MyPosts">My Posts</option>
            <option value="Favorites">My Favorites</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>);           
        }
        else{
        return (<select id="catBrowse" name="category" onChange={that.onChange} value={that.state.category}>
            <option value="None">---</option>
            <option value="All">All</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>);        
        }
    },
    onChange: function(e){
        this.props.navigate(false);
        let state = {};
        state["category"] =  e.target.value;
        this.setState(state);
        if(e.target.value !== "All"){
            if(e.target.value === "Favorites"){
                BrowserHistory.push("/favorites");
            }
            else if(e.target.value === "MyPosts"){
                BrowserHistory.push("/myPosts/1");     
            }
            else{
               BrowserHistory.push("/category/" + e.target.value + "/1");      
            }
        }
        else{
            if(e.target.value !== "None"){
             BrowserHistory.push("/all/1");   
            }
        }
    }
});
var mapStateToProps = function(state){
    return {nonCategoryChange: state.navigation.nonCategoryChange};
};
var mapDispatchToProps = function(dispatch){
    return {
        navigate: function(nonCategoryChange){ 
            dispatch(actions.navigate(nonCategoryChange)); },
        endNavigate: function(){
            dispatch(actions.endNavigate());
        }
    }
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
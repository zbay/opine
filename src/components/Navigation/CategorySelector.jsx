"use strict";
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');

module.exports = React.createClass({
    render: function(){
        if(this.props.loggedIn){
        return (<select id="catBrowse" onChange={this.onChange}>
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
        return (<select id="catBrowse" onChange={this.onChange}>
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
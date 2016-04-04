"use strict";
var React = require('react');
var ActionBar = require("../Navigation/ActionBar");

module.exports = React.createClass({
    getInitialState: function(){
      return {visibleForm: false};  
    },
    render: function(){
        return (<div className="container-fluid">
       <ActionBar visibleForm={this.state.visibleForm}/>
       <div id="about">
       <h2>Getting Started</h2>
       <p>Opine is a simple platform for soliciting opinions, and finding people who want to hear your opinions. Do you want people to call in to your
       radio show, comment on your blog, or offer anonymous personal opinions on something? Then Opine is for you!</p>
       <p>To get started browsing, pick a category above or search for something you're interested in.</p>
       <p>To get started posting, click "Ask Something" and fill out the form.</p><br />
       
       <h3>Sample question 1 (list version)</h3>
        <img src="./img/reactblog.png" className="img-responsive"/><br />
       
       <h2>Notes for Frequent Users</h2>
       <p>Note that all posts will be automatically deleted from the website, two or three days after their deadline has passed.</p>
       <p>You can keep track of up to 100 interesting posts by adding them to your "favorites" list. Please do not delete cookies from this site, if you want to keep your favorites list.</p>
       <p>There are no plans to add user accounts to this site. Feel free to identify yourself in your question contact info, 
       but the site will remain an officially anonymous platform.
       We do save your IP address, and will ban it from posting if you spam the site or otherwise cross a line of decency.</p><br />
        
        <h3>Sample question 2 (standalone version)</h3>
       <img src="./img/jetsqb.png" className="img-responsive"/>
       </div>
        </div>);
    }
});
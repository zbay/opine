var React = require('react');
var ActionBar = require("../Navigation/ActionBar");

module.exports = React.createClass({
    getInitialState: function(){
      return {visibleForm: false};  
    },
    render: function(){
        return (<div id="about">
       <ActionBar visibleForm={this.state.visibleForm}/>
       <h2>Getting Started</h2>
       <p>Opine is a simple platform for soliciting opinions, and finding people who want to hear your opinions. Do you want people to call in to your
       radio show, comment on your blog, or offer anonymous personal advice? Then Opine is for you!</p>
       <p>To get started browsing, pick a category above or search for something you're interested in.</p>
       <p>To get started posting, click "Ask Something" and fill out the form.</p>
       
       <h2>Notes for Frequent Users</h2>
       <p>Note that all posts will be automatically deleted from the website, a few days after their deadline has passed.</p>
       <p>All posts you create will be automatically saved in your browser as a "favorite", accessed under the "My Favorites" category.
       You can also manually add favorites to your list. Please do not delete cookies from this site, if you want to keep your favorites list.</p>
       <p>There are no plans to add user accounts to this site. Feel free to identify yourself, but the site will stay anonymous to promote freedom of
       expression and entertaining trolls. We do save your IP address, and will ban it from posting if you spam the site or otherwise cross a basic ine of decency.</p>
        </div>);
    }
});
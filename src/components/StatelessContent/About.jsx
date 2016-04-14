var React = require('react');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');
var Link = ReactRouter.Link;

var About = React.createClass({
    render: function(){
        return (<div>
       <div id="about" className="container-fluid">
       {this.props.loggedIn ? (<div id="resetNotice" className="row">
       <div className="col-sm-12">
       Want to change your password? <Link to="/change_password">Click here</Link>.</div></div>): (<span></span>)}
       <br />
       <h2>Getting Started</h2>
       <p>Opine is a simple platform for soliciting opinions, and finding people who want to hear your opinions. Do you want people to call in to your
       radio show, comment on your blog, or offer anonymous personal opinions on something? Then Opine is for you!</p>
       <p>To get started browsing, pick a category above or search for something you're interested in.</p>
       <p>To get started posting, click "Ask Something" and fill out the form.</p><br />
       
       <div className="sampleBlock">
       <h3>Sample question 1 (list version)</h3>
        <img src="./img/react.png" className="img-responsive"/>
        </div>
       
       <h2>For Frequent Users</h2>
       <p>Although this site is anonymous in the sense that no name or email address is necessarily displayed with any post, feel free to identify yourself. You also have the option to make a free account and gain some features: 
       </p>
       <ol>
            <li>You'll be able to edit your posts and comments.</li>
            <li>You'll be able to delete your posts and comments.</li>
            <li>You'll be able to make a list of up to 100 "My Favorite" posts that you can track in one place. Posts that you, yourself, have made can be tracked separately in a "My Posts" lists.</li>
            <li>You'll still be able to post on the site, even in the event that an anonymous user on your IP address has been banned.</li>
            <li>You will also maintain outward anonymity, just like any other poster or commenter on the site.</li>
       </ol>
      <br />
       
       <div className="sampleBlock">
       <h3>Sample question 2 (standalone version)</h3>
       <img src="./img/jets.png" className="img-responsive"/>
       </div>
       </div>
        </div>);
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(About);
var React = require('react');
var Posting = require("./posting");

module.exports = React.createClass({
    render: function(){
        return (
        <div id="postingsList">
        {this.renderPostings()}
        </div>);
    },
    renderPostings: function(){
        if(this.props.postings.length > 0){
          return (this.props.postings.map(function(posting){
            return (<Posting key={posting._id} postingData={posting} />)
        }));   
        }
        else{
            return(<div id="errorMessage">There are no open questions! Go ahead and post one, to get us started.</div>);
        }
    }
});
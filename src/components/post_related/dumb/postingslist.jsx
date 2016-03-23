var React = require('react');
var Posting = require("./posting");

module.exports = React.createClass({
    propTypes: {
        postings: React.PropTypes.array.isRequired
    },
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
            if(this.props.page <= 1)
            {
            return(<div id="errorMessage">There are no open questions! Go ahead and post one, to get us started.</div>);    
            }
            else{
                return(<div id="errorMessage">There are no more questions to browse! Please go back one page.</div>);
            }
        }
    }
});
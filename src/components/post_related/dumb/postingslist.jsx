var React = require('react');
var Posting = require("./posting");

module.exports = React.createClass({
    propTypes: {
        postings: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired
    },
    render: function(){
        return (
        <div id="postingsList" className="container">
        <div className="row">
        {this.renderPostings()}
        </div>
        </div>);
    },
    renderPostings: function(){
        if(this.props.postings.length > 0){
          return (this.props.postings.map(function(posting){
            return (<div className="col-xs-12"><Posting key={posting._id} postingData={posting} /></div>)
        }));   
        }
        else{ //if there are postings
            if(Number(this.props.page) <= 1)
            {
            return(<div id="errorMessage">There are no open questions here! Go ahead and post one, to get us started.</div>);    
            }
            else{ //if this is not the first page of results, but there are none to return
                return(<div id="errorMessage">There are no more questions to browse, here! Please go back.</div>);
            }
        }
    }
});
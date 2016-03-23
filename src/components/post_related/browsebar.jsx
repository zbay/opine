var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var HashHistory = require('react-router/lib/hashHistory');
var CategorySelector = require("./categoryselector");
module.exports = React.createClass({
    propTypes: {
      page: React.PropTypes.string.isRequired,
      criteria: React.PropTypes.string.isRequired,
      addendum: React.PropTypes.string.isRequired
    },
    render: function(){
        var showPrev = false;
        var showNext = true;
        let that = this;
        if(this.props.page > 1){
            showPrev = true;
        }
        if(!this.props.hasNext){
            showNext = false;
        }
        return (
        <div id="browseBar" className="container">
        <div className="row">
        <div className="col-sm-4">
        {showPrev ? <button onClick={this.prevPage}>
        Page {"" + (Number(that.props.page)-1)}
        </button> : <span></span>
        }
        {showNext ? <button onClick={this.nextPage}>
        Page {"" + (Number(that.props.page)+1)}
        </button>: <span></span>
        }
        </div>
        <div className="col-sm-4" id="categoryColumn">
        <span>Browse by category: </span>&nbsp;
        <CategorySelector />
        </div>
        <div className="col-sm-4" id="searchColumn">
        <label>Search Questions: </label>&nbsp;<input name="searchQuery" />
        </div>
        </div>
        </div>);
    },
    prevPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + Number(this.props.page-1));
    },
    nextPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + Number(this.props.page+1));
    }
    });
"use strict";
var React = require('react');
var BrowserHistory = require('react-router/lib/browserHistory');

module.exports = React.createClass({
    propTypes: {
      page: React.PropTypes.string.isRequired,
      criteria: React.PropTypes.string.isRequired,
      addendum: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {
            search: ""
        }
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
        <div id="pageBar" className="container">
        <div className="row">
        <div className="col-xs-2">
        {showPrev ? <button onClick={this.prevPage}>
        <span className="glyphicon glyphicon-arrow-left"></span><br />Page {"" + ((Number(that.props.page))-1)}
        </button> : <span></span>
        }
        </div>
        <div className="col-xs-8"></div>
        <div className="col-xs-2">
         {showNext ? <button onClick={this.nextPage}>
        <span className="glyphicon glyphicon-arrow-right"></span><br />Page {"" + ((Number(that.props.page))+1)}
        </button>: <span></span>
        }      
        </div>
        </div>
        </div>);
    },
    prevPage: function(){
        BrowserHistory.push("/" + this.props.criteria + "/" + this.props.addendum + (Number(this.props.page)-1));
    },
    nextPage: function(){
        BrowserHistory.push("/" + this.props.criteria + "/" + this.props.addendum + (Number(this.props.page)+1));
    }
    });
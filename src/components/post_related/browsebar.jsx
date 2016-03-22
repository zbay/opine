var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var HashHistory = require('react-router/lib/hashHistory');
var CategorySelector = require("./categoryselector");
module.exports = React.createClass({
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
        <div id="browseBar">
        {showPrev ? <button onClick={this.prevPage}>
        Page {"" + (Number(that.props.page)-1)}
        </button> : <span></span>
        }
        {showNext ? <button onClick={this.nextPage}>
        Page {"" + (Number(that.props.page)+1)}
        </button>: <span></span>
        }&nbsp;
        <span>Browse by category: </span>&nbsp;
        <CategorySelector />
        </div>);
    },
    prevPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + (Number(this.props.page)-1));
    },
    nextPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + (Number(this.props.page)+1));
    }
    });
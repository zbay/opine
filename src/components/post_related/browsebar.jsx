var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashHistory');
var CategorySelector = require("./categoryselector");
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
        <form onSubmit={this.submitSearch}>
        <label>Search Questions: </label>&nbsp;<input name="search" value={this.state.search} onChange={this.onChange}/>
        <button type="submit">Go</button>
        </form>
        </div>
        </div>
        </div>);
    },
    prevPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + Number(this.props.page-1));
    },
    nextPage: function(){
        HashHistory.push("/" + this.props.criteria + "/" + this.props.addendum + Number(this.props.page+1));
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    submitSearch: function(e){
        //finish this. need to add state for the search query, and use it to make the URL
        e.preventDefault();
        let that = this;
        if(that.state.search.length > 0){
           HashHistory.push("/search/" + that.state.search + "/1");   
        }
    }
    });
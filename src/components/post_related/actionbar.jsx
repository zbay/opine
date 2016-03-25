var React = require('react');
var HashHistory = require('react-router/lib/hashHistory');
var CategorySelector = require("./categoryselector");
module.exports = React.createClass({
    propTypes: {
      visibleForm: React.PropTypes.bool,
      toggleVisible: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
        return {
            search: ""
        }
    },
    render: function(){
        return (
        <div id="actionBar" className="container">
        <div className="row">
        <div className="col-sm-3" id="toggleColumn">
        <button id="toggleForm" onClick={this.props.toggleVisible}>{this.props.visibleForm ? "Hide Question Form" : "Ask Something"}</button>
        </div>
        <div className="col-sm-4" id="categoryColumn">
        <label>Browse by category: </label>&nbsp;
        <CategorySelector />
        </div>
        <div className="col-sm-5" id="searchColumn">
        <form onSubmit={this.submitSearch}>
        <label>Search: </label>&nbsp;<input name="search" value={this.state.search} onChange={this.onChange}/>
        <button type="submit">Go</button>
        </form>
        </div>
        </div>
        </div>);
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
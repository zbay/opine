var React = require('react');
var Posting = require("./Posting");

module.exports = React.createClass({
    propTypes: {
        postings: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired
    },
    render: function(){
        return (
        <div id="postingsList">
        {this.renderPostings()}
        </div>);
    },
    getInitialState: function(){
        return {isLoading: true}
    },
    componentDidMount: function(){
        setTimeout(this.showError, 2000);
    },
    componentWillReceiveProps: function(){
      this.showError();
    },
    showError: function(){
         this.setState({isLoading: false}); 
    },
    renderPostings: function(){
        if(this.props.postings.length > 0){
          return (this.props.postings.map(function(posting){
            return (<Posting key={posting._id} postingData={posting} />)
        }));   
        }
        else{ //if there are postings
        if(!this.state.isLoading){
            if(Number(this.props.page) <= 1)
            {
            return(<div id="errorMessage">There are no open questions here! Go ahead and post one, to get us started.</div>);    
            }
            else{ //if this is not the first page of results, but there are none to return
                return(<div id="errorMessage">There are no more questions to browse, here! Please go back.</div>);
            }
        }
        else{
            return (<img src="./img/loading_spinner.gif"/>);
        }
        }
    }
});
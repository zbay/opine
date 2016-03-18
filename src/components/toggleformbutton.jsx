var React = require('react');
module.exports = React.createClass({
    render: function(){
        if(this.props.visible){
            return (<button id="toggleForm">Hide Form</button>);
        }
        else{
            return (<button id="toggleForm">Ask Something</button>); 
        }
    }
});
var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (<div id="refresher" className="container">
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
        <button onClick={this.props.reload}>Quick Reload&nbsp;&nbsp;<span className="glyphicon glyphicon-refresh"></span></button><br /><br />
        </div>
        </div>
        </div>);
    }
});
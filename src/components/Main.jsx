"use strict";
var React = require('react');
var Jumbotron = require("./StatelessUI/Jumbotron");
var Footer = require("./StatelessUI/Footer");

module.exports = React.createClass({
    render: function(){
        return (<div><Jumbotron />
       {this.props.children}
       <Footer />
        </div>);
    }
});
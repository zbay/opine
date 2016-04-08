var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (<button onClick={this.props.toggleFavorite}>
        {this.props.favorited ? (<span>Remove From Favorites</span>): (<span>Add To My Favorites</span>)}
        </button>);
    }
});
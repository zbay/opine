var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var localStorage = localStorage;

module.exports = React.createClass({
    propTypes: {
        postingData: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        var isFavorite = false;
        if(localStorage){
        var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
        if(currentFavorites){
            for(let i = 0; i < currentFavorites.length; i++){
            if(currentFavorites[i] == this.props.postingData._id){
                isFavorite = true;
            }
        }   
        }      
        }
        return {favorited: isFavorite};
    },
    render: function(){
        return (<div className="posting">
        <div className="postQuestion">
        <h3><Link to={"/question/" + this.props.postingData._id}>Question</Link></h3>
        {this.props.postingData.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.props.postingData.asker}</div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        {this.props.postingData.howToContact}</div>
        <div className="postCategory">
        <h3>Filed Under:</h3>
        {this.props.postingData.category}</div><br />
        {this.state.favorited? (<span></span>): <button onClick={this.addFavorite}>Add To My Favorites</button>}
        </div>);
    },
    addFavorite: function(){
        if(localStorage){
            var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
            if(currentFavorites.length && currentFavorites.length >= 100){
                currentFavorites.shift();
            }
            if(currentFavorites === null || currentFavorites === undefined){
                currentFavorites = [];
            }
            currentFavorites.push(this.props.postingData._id);
            localStorage.setItem("favorites", JSON.stringify(currentFavorites));
            this.setState({favorited: true});   
        }
    }
});
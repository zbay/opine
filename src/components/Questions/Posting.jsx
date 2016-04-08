var React = require('react');
var Link = require('react-router').Link;
var axios = require('axios');
var EditPostForm = require("./EditPostForm");
var ReactRedux = require('react-redux');
var localStorage = localStorage || window.localStorage;

var Posting = React.createClass({
    propTypes: {
        postingData: React.PropTypes.object.isRequired,
    },
    getInitialState: function(){
        let that = this;
        var isFavorite = false;
        if(localStorage){
        var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
        if(currentFavorites && currentFavorites.length){
            for(let i = 0; i < currentFavorites.length; i++){
            if(currentFavorites[i] == that.props.postingData._id){
                isFavorite = true;
            }
        }   
        }      
        }
        return {favorited: isFavorite, editing: false, deleted: false, displayData: that.props.postingData};
    },
    render: function(){
        if(!this.state.deleted){
        if(!this.state.editing){
        return (<div className="posting container-fluid">
        <div className="postQuestion">
        <h3><Link to={"/question/" + this.props.postingData._id}>Question</Link></h3>
        {this.state.displayData.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.state.displayData.asker}</div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        {this.state.displayData.howToContact}</div>
        <div className="postCategory">
        <h3>Filed Under:</h3>
        {this.state.displayData.category}</div><br />
        {this.state.favorited ? (<span></span>): <button onClick={this.addFavorite}>Add To My Favorites</button>}<br /><br />
        {this.state.displayData.editable ? 
            (<div>{!this.state.editing ? 
                (<button onClick={this.editify}>Edit Post</button>): (<button onClick={this.saveEdit}>Save Edit</button>)}&nbsp;
            <button onClick={this.deletePost}>Delete Post</button></div>): (<span></span>)}
        </div>);     
        }
        else{ //if not deleted, but is editing
            return (<EditPostForm postingData={this.state.displayData} cancelEdit={this.cancelEdit} saveEditRender={this.saveEditRender}/>);
        }
        }
        else{
            return (<span></span>);
        }
    },
    addFavorite: function(){
        if(localStorage){
            var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
            if(currentFavorites && currentFavorites.length >= 100){
                currentFavorites.shift();
            }
            if(currentFavorites === null || currentFavorites === undefined){
                currentFavorites = [];
            }
            currentFavorites.push(this.props.postingData._id);
            localStorage.setItem("favorites", JSON.stringify(currentFavorites));
            this.setState({favorited: true});   
        }
    },
    editify: function(){
      this.setState({editing: true});  
    },
    cancelEdit: function(){
        this.setState({editing: false});
    },
    saveEditRender: function(newPostData){
      this.setState({editing: false, displayData: newPostData});
    },
    deletePost: function(){
        let that = this;
        if(that.props.postingData.editable && that.props.loggedIn){
        let postData = {id: that.props.postingData._id};
        axios.post("/deletePosting", postData).then(function(response){
            if(!response.data.error){
                that.setState({deleted: true});
            }
        });   
        }
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, email: state.loggedIn.email};
};

module.exports = ReactRedux.connect(mapStateToProps)(Posting);
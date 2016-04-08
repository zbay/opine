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
        return {favorited: false, editing: false, deleted: false, displayData: that.props.postingData};
    },
    componentDidMount: function(){
        let that = this;
        let isFavorite = false;
        if(that.props.email){
            axios.post("/testIfFavorite", {postID: that.props.postingData._id, email: that.props.email}).then(function(response){
                console.log("response: " + JSON.stringify(response));
                isFavorite = response.data.isFavorite;
                if(isFavorite){
                    that.setState({favorited: true});
                }
            });   
        }
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
        {this.state.displayData.category}</div>
        {(this.state.favorited || !this.props.loggedIn) ? (<span></span>): <div><br /><button onClick={this.addFavorite}>Add To My Favorites</button><br /></div>}
        {this.state.displayData.editable ? 
            (<div><br />{!this.state.editing ? 
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
        let that = this;
        let faveData = {"postID": this.props.postingData._id, "email": that.props.email};
        axios.post("/addFavorite", faveData).then(function(response){
            that.setState({favorited: true});
        });
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
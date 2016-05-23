var React = require('react');
var Link = require('react-router').Link;
var axios = require('axios');
var EditPostForm = require("./EditPostForm");
var FaveButton = require("./Stateless/FaveButton");
var ReactRedux = require('react-redux');
var localStorage = localStorage || window.localStorage;
var moment = require("moment");

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
        if(that.props.loggedIn){
            axios.post("/testIfFavorite", {postID: that.props.postingData._id}).then(function(response){
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
        <h3>{this.props.standalone ? (<span>Question</span>): (<Link to={"/question/" + this.props.postingData._id + "/1"}>Question</Link>)}</h3>
        {this.state.displayData.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.state.displayData.asker}</div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        {this.state.displayData.howToContact}</div>
        {this.props.standalone ? (<div className="postCategory">
            <h3>Filed Under:</h3>
            {this.state.displayData.category}</div>): (<span></span>)}
        <h3>Posted On: </h3>
        {moment(this.props.postingData.timePosted).format('MMMM Do YYYY, h:mm a')}
        <h3>Deadline: </h3>
        {moment(this.props.postingData.deadline).format('MMMM Do YYYY, h:mm a')}
        {!this.props.loggedIn ? (<span></span>): <div><br /><FaveButton toggleFavorite={this.toggleFavorite} favorited={this.state.favorited}/><br /></div>}
        {this.state.displayData.editable ? 
            (<div><br /><button onClick={this.editify}>Edit Post</button>&nbsp;
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
    toggleFavorite: function(){
        let that = this;
        let faveData = {"postID": that.props.postingData._id};
        if(that.state.favorited){
        axios.post("/removeFavorite", faveData).then(function(response){
            that.setState({favorited: false});
        });   
        }
        else{
        axios.post("/addFavorite", faveData).then(function(response){
            that.setState({favorited: true});
        });   
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
    return {loggedIn:state.loggedIn.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(Posting);
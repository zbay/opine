var React = require('react');
var ReactRedux = require('react-redux');
var axios = require('axios');
var actions = require("../../actions");

var CommentsList = require("../Comments/CommentsList");
var NewCommentForm = require("../Comments/NewCommentForm");
var Refresher = require("../Navigation/Refresher");
var Posting = require("./Posting");
var localStorage = localStorage || window.localStorage;

var StandaloneQuestion = React.createClass({
    propTypes: {
        questionID: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
      return {question: null, comments: [], isLoading: true, favorited: false}  
    },
    componentDidMount: function(){
        setTimeout(this.showError, 2000);
        this.props.navigate();
    },
    componentWillReceiveProps: function(){
      this.showError();
    },
    showError: function(){
         this.setState({isLoading: false}); 
    },
    componentWillMount: function(){
      this.retrieveQuestion();  
      this.retrieveComments();
    },
    render: function(){
        if(this.state.question !== null){
        return (<div>
        <Posting standalone={true} postingData={this.state.question}/>
        <NewCommentForm questionID={this.props.questionID} refreshComments={this.retrieveComments}/>
        <br />
        <CommentsList comments={this.state.comments} postID={this.props.questionID} refreshComments={this.retrieveComments} /><br />
        <Refresher reload={this.retrieveComments}/>
        </div>
        );            
        }
        else{
            if(!this.state.isLoading){
             return (<div id="errorMessage">The question could not be loaded. Either the URL is wrong, or the post has been deleted.</div>);   
            }
            else{
             return (<div id="spinner"><img src="/img/loading_spinner.gif"/></div>);
            }
        }
    },
    retrieveQuestion: function(){
        let that = this;
        let questionData = {id: that.props.questionID, userID: that.props.userID};
        axios.post("/questionData", questionData)
        .then(function(response){
            that.setState({question: response.data.postData});
        });
    },
    retrieveComments: function(){
         let that = this;
         console.log("retrieving comments");
         let idData = {"id": that.props.questionID, "userID": that.props.userID}
        axios.post("/comments", idData)
        .then(function(response){
            console.log(response.data.postData);
            if(response.data.postData.length <= 0){
                that.setState({comments: response.data.postData}); 
            }
            else{
        let iteratedOver = 0;
         for(let i = 0; i < response.data.postData.length; i++){
           iteratedOver++;
          if(that.props.userID && response.data.postData[i].userID && response.data.postData[i].userID === that.props.userID){
              response.data.postData[i]["editable"] = true;
              console.log(response.data.postData[i]);
          if(iteratedOver >= response.data.postData.length){
                that.setState({"comments": response.data.postData});   
          }
          }
          else{
            if(iteratedOver >= response.data.postData.length){
                that.setState({"comments": response.data.postData});   
          }
          }

      }   
            }
        });       
    },
    toggleForm: function(){
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    }
});

var mapDispatchToProps = function(dispatch){
    return {
        navigate: function(){ 
            dispatch(actions.navigate(true)); }
    }
};
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID, justChanged: state.navigation.justChanged};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StandaloneQuestion);
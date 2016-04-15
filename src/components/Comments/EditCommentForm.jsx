var React = require('react');
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

module.exports = React.createClass({
    getInitialState: function(){
      return {text: this.props.commentData.text}  
    },
    render: function(){
          return (<div className="comment">
          <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/>
          <span className="commentNumber">{this.props.index+1}.&nbsp;&nbsp;</span>
          <textarea name="text" rows="3" value={this.state.text} onChange={this.onChange}></textarea>
          <br />
          <div><br /><button onClick={this.saveEdit}>Save Edit</button>&nbsp;<button onClick={this.props.cancelEdit}>Cancel Edit</button></div>
          </div>);      
    },
    onChange: function(e){
        let state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    saveEdit: function(e){
        e.preventDefault();
        let that = this;
        if(that.state.text !== null){
         let commentData = {
            commentID: that.props.commentData._id,
            text: that.state.text.trim().substr(0, 1000)
        };
        axios.post("/editComment", commentData).then(function(response){
            commentData.editable = true;
            console.log(JSON.stringify(response));
            if(response.data.success){
                that.props.saveEditRender(commentData);
            }
            else{ //if the posting was unsuccesful
                console.log(response.data.error);
                that.setState({errorMessage: response.data.error,
                    successMessage: null
                });
            }
        });   
        }
        else{ //If a field is blank
            that.setState({errorMessage: "Your question was not edited! Make sure to fill out all fields and choose a date that hasn't passed.",
                successMessage: null
            });           
        }       
    }
});
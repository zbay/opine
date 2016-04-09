var React = require('react');
var axios = require('axios');
var DateJS = require('datejs');
var FormAlert = require("../Alerts/FormAlert");
var dateRegex =/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
var ReactRedux = require('react-redux');
const dailySeconds = 86400;
const maxYear = 2120;

var EditPostForm = React.createClass({
    getInitialState: function(){
        let that = this;
        return {
         question: that.props.postingData.question,
         asker: that.props.postingData.asker,
         howToContact: that.props.postingData.howToContact,
         deadline: that.props.postingData.deadline,
         category: that.props.postingData.category,
         successMessage: null,
         errorMessage: null
     };
    },
    render: function(){
        return (<div className="posting container-fluid">
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/>
        <div className="postQuestion">
        <h3>Question</h3>
        <input name="question" value={this.state.question} onChange={this.onChange}/><br /></div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        <input name="asker" value={this.state.asker} onChange={this.onChange} />
        </div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        <input name="howToContact" value={this.state.howToContact} onChange={this.onChange}/></div>
        <h3>Deadline</h3>
        <input type="date" name="deadline" value={this.state.deadline} onChange={this.onChange}/><br />
        <div className="postCategory">
        <h3>Filed Under:</h3>
         <select name="category" value={this.state.category} onChange={this.onChange}>
            <option>---</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>
        </div><br />
            <button onClick={this.saveEdit}>Save Edit</button>&nbsp;
            <button onClick={this.props.cancelEdit}>Cancel Edit</button>
        </div>);    
    },
    onChange: function(e){
        let state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    saveEdit: function(e){
        e.preventDefault();
        let fixedDeadline = this.state.deadline ? this.state.deadline.replace(/\//g, "-"): "";
        let that = this;
        if(fixedDeadline.match(dateRegex) !== null && Number(fixedDeadline.slice(0, 4) < maxYear)){ //if the deadline meets the MM/DD/YYYY format and year isn't huge
        if(that.state.question !== null && that.state.asker !== null && that.state.howToContact !== null && 
        Date.parse(fixedDeadline).getTime()/1000 > (Math.floor(Date.now() / 1000) - (dailySeconds)) ){
         let postData = {
            id: that.props.postingData._id,
            question: that.state.question,
            asker: that.state.asker,
            howToContact: that.state.howToContact,
            deadline: fixedDeadline,
            category: that.state.category,
            email: that.props.postingData.email
        };
        axios.post("/editPosting", postData).then(function(response){
            postData.editable = true;
            if(response.data.success){
                that.props.saveEditRender(postData);
            }
            else{ //if the posting was unsuccesful
                console.log(response.data.error);
                that.setState({errorMessage: response.data.error,
                    successMessage: null
                });
            }
        });   
        }
        else{ //If a field is blank or the deadline chosen is in the past
            that.setState({errorMessage: "Your question was not edited! Make sure to fill out all fields and choose a date that hasn't passed.",
                successMessage: null
            });           
        }       
        }
        else{ //if the deadline doesn't meet the MM/DD/YYYY format
            that.setState({errorMessage: "Your question was not edited! Please make sure it fits the YYYY/MM/DD date format and isn't too far in the future.",
                successMessage: null
            });        
        }
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(EditPostForm);
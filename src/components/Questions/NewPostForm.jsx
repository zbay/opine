var React = require('react');
var axios = require('axios');
var DateJS = require('datejs');
var dateRegex =/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
const dailySeconds = 86400;
module.exports = React.createClass({
    propTypes: {
      visible: React.PropTypes.bool
    },
    getInitialState: function(){
        return {
         question: null,
         asker: null,
         contact: null,
         deadline: null,
         category: "Miscellaneous",
         successMessage: null,
         errorMessage: null,
     };
    },
    componentDidMount: function(){
    let that = this;
    axios.get("https://api.ipify.org?format=json").then( function (data) {
        that.setState({IP: data.data.ip});
    });
    },
    render: function(){
    if(this.props.visible){
        return (<form id="newPostForm" onSubmit={this.newPost}>
        <div id="formAlert">
        {this.state.successMessage ? (<div id="formSuccess">{this.state.successMessage}</div>): (<span></span>)}
        {this.state.errorMessage ? ( <span id="formError">{this.state.errorMessage}</span>): (<span></span>)}
        </div><br />
        <label>Question:</label><br />
        <input placeholder="What do you want to hear opinions about?" name="question" value={this.state.question} onChange={this.onChange}/><br /><br />
        <label>Asker:</label><br />
        <input placeholder="Who's asking?" name="asker" value={this.state.asker} onChange={this.onChange}/><br /><br />
         <label>How to contact:</label><br />
         <input placeholder="URL, email, phone, etc." name="contact" value={this.state.contact} onChange={this.onChange}/><br /><br />
         <label>Deadline:</label><br />
         <input placeholder="Format: YYYY/MM/DD" type="date" name="deadline" value={this.state.deadline} onChange={this.onChange}/><br /><br />
         <label>Category:</label><br />
         <select name="category" value={this.state.category} onChange={this.onChange}>
            <option>---</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select><br /><br />
         <button type="submit">Post New Question</button>
    </form>);
    }
    else{
        return (<span></span>);
    }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    newPost: function(e){
        e.preventDefault();
        let fixedDeadline = this.state.deadline.replace(/\//g, "-");
        let that = this;
        if(fixedDeadline.match(dateRegex) !== null){ //if the deadline meets the MM/DD/YYYY format
        if(that.state.question !== null && that.state.asker !== null && that.state.contact !== null && 
        Date.parse(fixedDeadline).getTime()/1000 > (Math.floor(Date.now() / 1000) - (dailySeconds)) ){
         let postData = {
            question: that.state.question,
            asker: that.state.asker,
            contact: that.state.contact,
            deadline: fixedDeadline,
            category: that.state.category,
            IP: that.state.IP
        };
        console.log(postData);
        axios.post("/addPosting", postData).then(function(response){
            if(response.data.success){
                that.setState({successMessage: "Question successfully posted!", 
                    question: null,
                    asker: null,
                    contact: null,
                    deadline: null,
                    category: "Miscellaneous",
                    errorMessage: null
                });
                if(that.props.newPostsRender){
                  that.props.newPostsRender();   
                }
            }
            else{ //if the posting was unsuccesful
                console.log(response.data.error);
                that.setState({errorMessage: "Your question was not posted! Please try again.",
                    successMessage: null
                });
            }
        });   
        }
        else{ //If a field is blank or the deadline chosen is in the past
            that.setState({errorMessage: "Your question was not posted! Make sure to fill out all fields and choose a date that hasn't passed.",
                successMessage: null
            });           
        }       
        }
        else{ //if the deadline doesn't meet the MM/DD/YYYY format
            that.setState({errorMessage: "Your question was not posted! Please make sure it fits the YYYY/MM/DD date format.",
                successMessage: null
            });        
        }

    }
});
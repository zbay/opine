var React = require('react');
var axios = require('axios');
var DateJS = require('datejs');
var FormAlert = require("../Alerts/FormAlert");
var dateRegex =/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
const dailySeconds = 86400;
const maxYear = 2120;

var NewPostForm = React.createClass({
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
         newPostURL: null
     };
    },
    componentDidMount: function(){
    let that = this;
    axios.get("https://api.ipify.org?format=json").then( function (data) {
        that.setState({IP: data.data.ip});
    });
    },
    render: function(){
        let that = this;
    if(that.props.visible){
        return (<form id="newPostForm" className="container-fluid" onSubmit={that.newPost}>
        <FormAlert successMessage={that.state.successMessage} newPostURL={that.state.newPostURL} errorMessage={that.state.errorMessage}/>
        <br />
        <div className="row"><label>Question:</label></div>
         <div className="row"><textarea rows="1" placeholder="What are you asking?" name="question" id="" value={that.state.question} onChange={that.onChange}></textarea></div><br />
         <div className="row"><label>Asker:</label></div>
         <div className="row"><textarea rows="1" placeholder="Who's asking?" name="asker" value={that.state.asker} onChange={that.onChange}></textarea></div><br />
         <div className="row"><label>How to contact:</label></div>
         <div className="row"><textarea rows="1" placeholder="URL, email, phone, etc." name="contact" value={that.state.contact} onChange={that.onChange}></textarea></div><br />
         <div className="row"><label>Deadline:</label></div>
         <div className="row"><input placeholder="Format: YYYY/MM/DD" type="date" name="deadline" value={that.state.deadline} onChange={that.onChange}/></div><br />
         <div className="row"> <label>Category:</label></div>
         <div className="row"> <select name="category" value={that.state.category} onChange={that.onChange}>
            <option>---</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select></div><br />
         <div className="row"><button type="submit">Post New Question</button></div>
    </form>);
    }
    else{
        return (<span></span>);
    }
    },
    onChange: function(e){
        let state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    newPost: function(e){
        e.preventDefault();
        let fixedDeadline = this.state.deadline ? this.state.deadline.replace(/\//g, "-"): "";
        let that = this;
        if(fixedDeadline.match(dateRegex) !== null && Number(fixedDeadline.slice(0, 4) < maxYear)){ //if the deadline meets the MM/DD/YYYY format and year isn't huge
        if(that.state.question !== null && that.state.question.length > 0 && that.state.asker !== null && that.state.asker.length > 0
        && that.state.contact !== null && that.state.contact.length > 0 &&
        Date.parse(fixedDeadline).getTime()/1000 > (Math.floor(Date.now() / 1000) - (dailySeconds)) ){
         let postData = {
            question: that.state.question.trim().substr(0, 1000),
            asker: that.state.asker.trim().substr(0, 500),
            contact: that.state.contact.trim().substr(0, 500),
            deadline: fixedDeadline,
            category: that.state.category,
            IP: that.state.IP
        };
        console.log(postData);
        axios.post("/addPosting", postData).then(function(response){
            if(response.data.success){
                that.setState({successMessage: "Question successfully posted!", 
                    question: "",
                    asker: "",
                    contact: "",
                    deadline: "",
                    category: "Miscellaneous",
                    errorMessage: null,
                    newPostURL: "/question/" + response.data.success + "/1"
                });
            }
            else{ //if the posting was unsuccessful
                console.log(response.data.error);
                that.setState({errorMessage: response.data.error,
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
            that.setState({errorMessage: "Your question was not posted! Please make sure it fits the YYYY/MM/DD date format and isn't too far in the future.",
                successMessage: null
            });        
        }
    }
});

module.exports = NewPostForm;
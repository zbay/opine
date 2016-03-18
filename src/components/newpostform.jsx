var React = require('react');
var axios = require('axios');
module.exports = React.createClass({
    getInitialState: function(){
     return {
         question: null,
         asker: null,
         contact: null,
         deadline: null,
         category: "Miscellaneous",
         successMessage: null,
         errorMessage: null
     }
    },
    render: function(){
    if(this.props.visible){
        return (<form id="newPostForm">
        <div id="formAlert">
        <span id="formSuccess">{this.state.successMessage ? this.state.successMessage : ""}</span>
        <span id="formError">{this.state.errorMessage ? this.state.errorMessage : ""}</span>
        </div>
        <label>Question: </label><input placeholder="What do you want to hear opinions about?" name="question"/>
        <label>Asker: </label><input placeholder="Who's asking?" name="asker" onChange={this.onChange}/>
         <label>How to contact:</label><input placeholder="URL, email, phone, etc." name="contact" onChange={this.onChange}/>
         <label>Expires: </label><input placeholder="What do you want to receive opinions about?" type="date" name="deadline" onChange={this.onChange}/>
         <label>Category: </label><select name="category" onChange={this.onChange}>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>
         <button onClick={this.newPost}>Post Question</button>
    </form>);
    }
    else{
        this.setState({successMessage: null, errorMessage: null});
        return (<span></span>);
    }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);  
    },
    newPost: function(){
        // http://blog.revathskumar.com/2015/07/submit-a-form-with-react.html
        // figure out how to pass variables through axios
        axios.post("/", {
            question: this.state.question,
            asker: this.state.asker,
            contact: this.state.contact,
            deadline: this.state.deadline,
            category: this.state.category
        }).then(function(response){
            if(response.success){
                this.setState({successMessage: "Question successfully posted!", 
                    question: null,
                    asker: null,
                    contact: null,
                    deadline: null,
                    category: "Miscellaneous",
                    errorMessage: null
                });
            }
            else{
                this.setState({errorMessage: "Your question was not posted! Please try again.",
                    successMessage: null
                });
            }
        });
    }
});
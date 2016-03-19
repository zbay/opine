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
        return (<form id="newPostForm" onSubmit={this.newPost}>
        <div id="formAlert">
        <span id="formSuccess">{this.state.successMessage ? this.state.successMessage : ""}</span>
        <span id="formError">{this.state.errorMessage ? this.state.errorMessage : ""}</span>
        </div>
        <label>Question: </label><input placeholder="What do you want to hear opinions about?" name="question" value={this.state.question} onChange={this.onChange}/>
        <label>Asker: </label><input placeholder="Who's asking?" name="asker" value={this.state.asker} onChange={this.onChange}/>
         <label>How to contact:</label><input placeholder="URL, email, phone, etc." name="contact" value={this.state.contact} onChange={this.onChange}/>
         <label>Deadline: </label><input placeholder="What do you want to receive opinions about?" type="date" name="deadline" value={this.state.deadline} onChange={this.onChange}/>
         <label>Category: </label><select name="category" value={this.state.category} onChange={this.onChange}>
            <option value="Miscellaneous">---</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>
         <button type="submit">Post Question</button>
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
        let that = this;
         e.preventDefault();
         let postData = {
            question: that.state.question,
            asker: that.state.asker,
            contact: that.state.contact,
            deadline: that.state.deadline,
            category: that.state.category
        };
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
            }
            else{
                console.log(response.data.error);
                that.setState({errorMessage: "Your question was not posted! Please try again.",
                    successMessage: null
                });
            }
        });
    }
});
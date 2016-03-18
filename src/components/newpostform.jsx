var React = require('react');
var axios = require('axios');
module.exports = React.createClass({
    getInitialState: function(){
     return {
         question: null,
         asker: null,
         contact: null,
         deadline: null,
         category: "Miscellaneous"
     }
    },
    render: function(){
    if(this.props.visible){
        return (<form id="newPostForm">
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
        axios.post("/");
    }
});
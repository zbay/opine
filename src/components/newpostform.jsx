var React = require('react');
var axios = require('axios');
module.exports = React.createClass({
    render: function(){
    if(this.props.visible){
        return (<form id="newPostForm">
        <label>Question: </label><input placeholder="What do you want to hear opinions about?" name="question"/>
        <label>Asker: </label><input placeholder="Who's asking?" name="asker"/>
         <label>How to contact:</label><input placeholder="URL, email, phone, etc." name="contact"/>
         <label>Expires: </label><input placeholder="What do you want to receive opinions about?" type="date" name="deadline"/>
         <label>Category: </label><select name="category">
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
    newPost: function(){
        // http://blog.revathskumar.com/2015/07/submit-a-form-with-react.html
        axios.post("");
    }
});
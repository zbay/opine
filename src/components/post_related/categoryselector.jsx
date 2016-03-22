var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashHistory');

module.exports = React.createClass({
    render: function(){
        return (<select id="catBrowse" onChange={this.onChange}>
            <option value="None">---</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>);
    },
    onChange: function(e){
        if(e.target.value !== "None"){
         HashHistory.push("/category/" + e.target.value + "/1");   
        }
        else{
            HashHistory.push("/all/1");
        }
    }
});
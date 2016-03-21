var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
module.exports = React.createClass({
    render: function(){
        var showPrev = false;
        var showNext = true;
        let that = this;
        if(this.props.page > 1){
            showPrev = true;
        }
        if(!this.props.hasNext){
            showNext = false;
        }
        return (
        <div id="browseBar">
        {showPrev ? <button>
        <Link to={"/" + that.props.criteria + "/" + that.props.addendum + (Number(that.props.page)-1)}>Page {"" + (Number(that.props.page)-1)}</Link>
        </button> : <span></span>
        }
        {showNext ? <button>
        <Link to={"/" + that.props.criteria + "/" + that.props.addendum + (Number(that.props.page)+1)}>Page {"" + (Number(that.props.page)+1)}</Link>
        </button>: <span></span>
        }
        </div>);
    }
    });
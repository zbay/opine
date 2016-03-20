var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/main");
var About = require("./components/dumb/about");
var PostingsList = require("./components/post_related/postingslist");

var AllWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="all" page={this.props.routeParams.page}/>);
    }
});

var CategoryWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="category" page={this.props.routeParams.page} category={this.props.routeParams.category}/>);
    }
});

var SearchWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="search" page={this.props.routeParams.page} searchQuery={this.props.routeParams.searchQuery}/>);
    }
});

module.exports = (
  <Router history={HashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={About} />
      <Route path="all/:page" component={AllWrapper}/>
      <Route path="category/:category/:page" component={CategoryWrapper} />
      <Route path="search/:searchQuery/:page" component={SearchWrapper} />
    </Route>
  </Router>
);
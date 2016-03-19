var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/main");
var About = require("./components/about");
var PostingsList = require("./components/postingslist");
var ToggleFormButton = require("./components/toggleformbutton");

var AllWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="all" />);
    }
});

var CategoryWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="category" />);
    }
});

var SearchWrapper = React.createClass({
    render: function(){
        return (<PostingsList criteria="search" />);
    }
});

module.exports = (
  <Router history={HashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={AllWrapper} />
      <Route path="about" component={About} />
      <Route path="category/:id" component={CategoryWrapper} />
      <Route path="search/:id" component={SearchWrapper} />
    </Route>
  </Router>
);
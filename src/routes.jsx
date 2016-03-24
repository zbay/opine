var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/main");
var About = require("./components/content_dumb/about");
var PostingsListContainer = require("./components/post_related/postingslist_container");
var BadLink = require("./components/content_dumb/badlink");

var AllWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="all" page={this.props.routeParams.page} category={null} searchQuery={null}/>);
    }
});

var CategoryWrapper = React.createClass({
    render: function(){
        console.log("category param: " + this.props.routeParams.category);
        return (<PostingsListContainer criteria="category" page={this.props.routeParams.page} category={this.props.routeParams.category} searchQuery={null}/>);
    }
});

var SearchWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="search" page={this.props.routeParams.page} searchQuery={this.props.routeParams.searchQuery} category={null}/>);
    }
});

module.exports = (
  <Router history={HashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={About} />
      <Route path="all/:page" component={AllWrapper}/>
      <Route path="category/:category/:page" component={CategoryWrapper} />
      <Route path="search/:search/:page" component={SearchWrapper} />
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
);
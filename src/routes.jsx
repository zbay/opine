var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/main");
var About = require("./components/content_dumb/about");
var PostingsListContainer = require("./components/post_related/postingslist_container");
var Question = require("./components/post_related/question");
var BadLink = require("./components/content_dumb/badlink");
var ServerError = require("./components/content_dumb/servererror");

var AllWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="all" page={this.props.routeParams.page} category={null} searchQuery={null}/>);
    }
});

var CategoryWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="category" page={this.props.routeParams.page} category={this.props.routeParams.category} searchQuery={null}/>);
    }
});

var SearchWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="search" page={this.props.routeParams.page} search={this.props.routeParams.search} category={null}/>);
    }
});

var QuestionWrapper = React.createClass({
    render: function(){
        return (<Question questionID={this.props.routeParams.id} />);
    }
});

module.exports = (
  <Router history={HashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={About} />
      <Route path="all/:page" component={AllWrapper}/>
      <Route path="category/:category/:page" component={CategoryWrapper} />
      <Route path="search/:search/:page" component={SearchWrapper} />
      <Route path="question/:id" component={QuestionWrapper}/>
      <Route path="*" status={404} component={BadLink}/>
      <Route path="*" status={500} component={ServerError}/>
    </Route>
  </Router>
);
var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router/lib/hashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/Main");
var About = require("./components/StatelessContent/About");
var Question = require("./components/Questions/StandaloneQuestion");
var PostingsListContainer = require("./components/Questions/PostingsListContainer");
var BadLink = require("./components/StatelessContent/BadLink");

var AllWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="all" page={this.props.routeParams.page ? (this.props.routeParams.page): "1"} category={null} searchQuery={null}/>);
    }
});

var CategoryWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="category" page={this.props.routeParams.page ? (this.props.routeParams.page): "1"} category={this.props.routeParams.category} search={null}/>);
    }
});

var SearchWrapper = React.createClass({
    render: function(){
        return (<PostingsListContainer criteria="search" page={this.props.routeParams.page ? (this.props.routeParams.page): "1"} search={this.props.routeParams.search} category={null}/>);
    }
});

var FavoriteWrapper = React.createClass({
    render: function(){
        return(<PostingsListContainer criteria="favorites" page={1} search={null} category={null}/>);
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
      <Route path="all" component={AllWrapper}/>
      <Route path="category/:category/:page" component={CategoryWrapper} />
      <Route path="category/:category" component={CategoryWrapper}/>
      <Route path="search/:search/:page" component={SearchWrapper} />
      <Route path="search/:search" component={SearchWrapper} />
      <Route path="question/:id" component={QuestionWrapper}/>
      <Route path="favorites" component={FavoriteWrapper}/>
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
);
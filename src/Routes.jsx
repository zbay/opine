var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router/lib/browserHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var Store = require("./store");

var Main = require("./components/Main");
var About = require("./components/StatelessContent/About");
var Question = require("./components/Questions/StandaloneQuestion");
var PostingsListContainer = require("./components/Questions/PostingsListContainer");
var BadLink = require("./components/StatelessContent/BadLink");
var Login = require("./components/Login/LoginForm");
var Signup = require("./components/Login/SignupForm");
var Logout = require("./components/Login/Logout");
var SuccessfulReset = require('./components/StatelessContent/SuccessfulReset');
var ResetPassword = require('./components/Login/ChangePassword');

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
        return(<PostingsListContainer criteria="favorites" page={"1"} search={null} category={null}/>);
    }
});

var MyPostWrapper = React.createClass({
    render: function(){
        return(<PostingsListContainer criteria="myPosts" page={"1"} search={null} category={null}/>);
    }
});

var QuestionWrapper = React.createClass({
    render: function(){
        return (<Question questionID={this.props.routeParams.id} />);
    }
});

var LoginAuthWrapper = React.createClass({
    render: function(){
        return(<Login redirectMessage="Account successfully created!"/>);
    }
});

/*      <Route path="password_request" component={PasswordRequest}/>
     */

module.exports = (
  <Provider store={Store}>
  <Router history={BrowserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={About} />
      <Route path="all/:page" component={AllWrapper}/>
      <Route path="all" component={AllWrapper}/>
      <Route path="login" component={Login}/>
      <Route path="login/signedUp" component={LoginAuthWrapper}/>
      <Route path="reset" component={SuccessfulReset}/>
      <Route path="logout" component={Logout}/>
      <Route path="signup" component={Signup}/>
      <Route path="change_password" component={ResetPassword}/>
      <Route path="category/:category/:page" component={CategoryWrapper} />
      <Route path="category/:category" component={CategoryWrapper}/>
      <Route path="search/:search/:page" component={SearchWrapper} />
      <Route path="search/:search" component={SearchWrapper} />
      <Route path="myPosts/:page" component={MyPostWrapper} />
      <Route path="myPosts" component={MyPostWrapper} />
      <Route path="question/:id" component={QuestionWrapper}/>
      <Route path="favorites" component={FavoriteWrapper}/>
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
  </Provider>
);
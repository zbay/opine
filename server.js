var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var routes = require('./controllers');
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongo = require('mongodb');
var session = require('client-sessions');

var dotenv = require('dotenv').load();
//mongoose.connect('mongodb://localhost:27017/opine', function (err, db)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/opine', function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 60 * 60 * 1000,
  activeDuration: 60 * 60 * 1000,
  sessionID: null
}));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

routes(app);

console.log("Listening on Port 8080");
var server = app.listen(process.env.PORT || 8080);
}
});
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var routes = require('./controllers');
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongo = require('mongodb');
//https://ifelse.io/2015/08/27/server-side-rendering-with-react-and-react-router/ try this

//var dotenv = require('dotenv').load();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/opine', function (err, db)
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

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

routes(app);

console.log("Listening on Port 8080");
var server = app.listen(process.env.PORT || 8080);
}
});
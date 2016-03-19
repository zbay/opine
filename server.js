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

mongoose.connect('mongodb://localhost:27017/opine', function (err, db)
//mongoose.connect(process.env.MONGOLAB_URI, function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

console.log("Listening on Port 8080");
app.listen(8080);
}
});
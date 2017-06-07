const express = require('express'),
  bodyParser = require('body-parser'),
  urlStatus = require('url-status'),
  fs = require('fs'),
  http = require('http'),
  https = require('https'),
  helmet = require('helmet');


/* initiate express server */
let app = express();
/* Allow ejs templating */
app.set('view engine', 'ejs');
/* Allow body variables */
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
/* Allow json */
app.use(bodyParser.json());
/* Set server base directory location */
app.use(express.static(__dirname + '/public_html'));
/* Stricter HTTPS */
app.use(helmet({
  hsts: true
}));

/* add in routes as normal */
app.get('/', (req, res) => {
  res.send("hello world this is site one");
});

//Export instead of creating server
module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var urlStatus = require('url-status');
var fs = require('fs');
var http = require('http');
var https = require('https');
var helmet = require('helmet');


/* initiate express server */
var app = express();
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
app.get('/', function (req, res) {
    res.send("hello world this is site one");
});

//Export instead of creating server
module.exports = app;

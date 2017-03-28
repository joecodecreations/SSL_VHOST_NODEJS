var connect = require('connect');
var vhost = require('vhost');
var express = require('express');
var http = require('http');
var https = require('https');
var helmet = require('helmet');
var fs = require('fs');

/*SSL PRIVATE AND PUBLIC KEYS */
var pathToPrivateKey = "/some/path.pem";
var pathToPublicKey = "/some/path.pem";
var privateKey = fs.readFileSync(pathToPrivateKey, 'utf8');
var certificate = fs.readFileSync(pathToPublicKey, 'utf8');

var credentials = {
    key: privateKey,
    cert: certificate
};

var main = express();
/* Cron Jobs */

/* Site One */
var siteOnePath = "./sites/siteOne/server"; //path to site one js file
var siteOne = require(siteOnePath); //require that site file
main.use(vhost('siteOneDomain.com', siteOne)); //when we see that domain use this path
main.use(vhost('www.siteOneDomain.com', siteOne)); //also include www path

/* Site Two */
var siteTwoPath = "./sites/siteTwo/server";
var siteTwo = require(siteTwoPath);
main.use(vhost('siteTwoDomain.com', siteTwo));
main.use(vhost('www.siteTwoDomain.com', siteTwo));

//...Duplicate and add as many sites here as you would like

var httpsServer = https.createServer(credentials, main);

/* listen for connections on 80 and 433 for ssl */
main.listen(80);
main.listen(8080);
httpsServer.listen(443);
console.log('Server successfully started');

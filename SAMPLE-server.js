const connect = require('connect'),
  vhost = require('vhost'),
  express = require('express'),
  http = require('http'),
  https = require('https'),
  helmet = require('helmet'),
  fs = require('fs');

/*SSL PRIVATE AND PUBLIC KEYS */
const pathToPrivateKey = "/some/path.pem",
  pathToPublicKey = "/some/path.pem",
  privateKey = fs.readFileSync(pathToPrivateKey, 'utf8'),
  certificate = fs.readFileSync(pathToPublicKey, 'utf8'),
  credentials = {
    key: privateKey,
    cert: certificate
  };

let main = express();

/* Site One */
const siteOnePath = "./sites/siteOne/server"; //path to site one js file
const siteOne = require(siteOnePath); //require that site file
main.use(vhost('siteOneDomain.com', siteOne)); //when we see that domain use this path
main.use(vhost('www.siteOneDomain.com', siteOne)); //also include www path

/* Site Two */
const siteTwoPath = "./sites/siteTwo/server";
const siteTwo = require(siteTwoPath);
main.use(vhost('siteTwoDomain.com', siteTwo));
main.use(vhost('www.siteTwoDomain.com', siteTwo));

//...Duplicate and add as many sites here as you would like

let httpsServer = https.createServer(credentials, main);

/* listen for connections on 80 and 433 for ssl */
main.listen(80);
main.listen(8080);
httpsServer.listen(443);
console.log('Node server successfully started');

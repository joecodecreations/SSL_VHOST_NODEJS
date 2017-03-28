# Generating Free SSL Certificates for Multiple Domains Using VHOST, Express, NODEJS

Using VHOST and express it is possible to host multiple websites using a single server.

The included files cover the general idea to get you up and running.


## Creating the Certificates
(Running Ubuntu 14.04 LTS)
When using Let's encrypt, you will do the following commands:

Add Certbot to your list of software available
`sudo add-apt-repository ppa:certbot/certbot`

Update all software references
`sudo apt-get update`

Install Certbot
`sudo apt-get install certbot`

Create Certificates for your different domains

`certbot certonly --standalone -d siteOneDomain.com -d www.siteOneDomain.com -d siteTwoDomain.com -d www.sitetwoDomain.com`

Update siteOneDomain and siteTwoDomain to your own domains and add as many sites will multi-use this certificate by adding `-d newsitename.com -d www.newsitename.com`.

So make sure you include both with and without www.

When it has been completed it will create the certs. Update your path to private and public on your `SAMPLE-server.js`(server.js) file.

## Starting The Server
You would only run node `SAMPLE-server.js` (you will want to change this to server.js for actual deployment).

This file will automatically take care of running the other two websites.

Note: to keep it running use `forever start server.js`. If you don't have that, run `npm install -g forever`

var https = require('https');
var fs = require('fs');
	pem = require('pem');

var options = {
      key: fs.readFileSync('certs/private-key.pem'),
      cert: fs.readFileSync('certs/certificate.pem'),
      requestCert: false,
      rejectUnauthorized: false
};
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});
});


var express = require('express');
var app = express();


var router = require('./app');

app.set('port', process.env.PORT || 8000);

app.use(router);

app.listen(app.get('port'),'0.0.0.0');

console.log('servidor funcionando por el puerto' + app.get('port'));

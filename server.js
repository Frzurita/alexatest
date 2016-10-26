var express = require('express');
var app = express();
var router = require('./app');
//require('./node_modules/na-app-demo/bower_components/d3/d3.min.js');
//require('./node_modules/na-app-demo/bower_components/eventEmitter/EventEmitter.js');
//require('./node_modules/na-app-demo/bower_components/notification-js/build/notification.min.js');
var HuaweiSmarthome = require('./node_modules/na-app-demo/public/sdk/huaweiSmarthome.min.js');
//var huClient = require('./frontend/js/clientHuawei.js');

app.set('port', process.env.PORT || 8000);

app.use(router);

app.listen(app.get('port'),'0.0.0.0');

console.log('servidor funcionando por el puerto' + app.get('port'));

//console.log('intentando conectar a la plataforma de huawei');
//huClient.init();

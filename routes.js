var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var request = require('request');
var qs = require('querystring');
var alexa_app = require('alexa-app');
var alexa = new alexa_app.app('SmartHome');

alexa.intent('MySensorIsIntent',
    {
        "slots":{
            "name":"DeviceSensor",
            "type":"LIST_OF_SENSOR"
        }
        ,"utterances":[ "say the number {1-100|number}" ]
    },
    function(request,response) {
        var number = request.slot('name');
        response.say("You asked for the number "+ number);
    }
);


alexa.intent('',
    {
        "utterances":[ "say the number {1-100|number}" ]
    },
    function(request,response) {
        var number = request.slot('number');
        response.say("You asked for the number "+number);
    }
);

/* GET home_page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/api/lights', function (req, res, next) {
    console.log('Hello world');
});

router.post('/api/alexa',function(req,res) {
    console.log(req.body);
    alexa.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

router.get('/api/alexa', function (req, res, next) {
    console.log("I'm a get function");
    res.json({msg: "I'm a get method"});
});

module.exports = router;
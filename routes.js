var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var requested = require('request');
var qs = require('querystring');
var alexa_app = require('alexa-app');
var alexa = new alexa_app.app('test');

alexa.launch(function(request,response) {
    response.say("Hello, welcome to the hell").shouldEndSession(false)
        .reprompt('Pepe mama facking');
});

alexa.intent('MySensorIsIntent',
    {
        "slots":[{
            "name":"DeviceSensor",
            "type":"LIST_OF_SENSOR"
        }]
    },
    function(request,response) {
        console.log('Estoy en slot');
        var number = request.slot();
        response.say("You asked for the number ");
    }
);



alexa.intent('HappyBirthdayIntent',
    {
        "slots":{
            "name":"NAME",
            "value":"VALUE"
        }
    },
    function(request,response) {
        console.log('Estoy en slot');
        var name = request.slot("birthName");
        var age = request.slot("age");
        console.log(name);
        response.say("Hello " + name + ". I'm Alexa, I wish you a very happy birthday. "+ age +" is a great age to do awesome stuff.");
    }
);

alexa.intent('turnTheLightOnIntent',
    {
        "slots":{
            "name":"NAME",
            "value":"VALUE"
        }
    },
    function(request,response) {
        var state = request.slot("light_state");
        var name = request.slot("light_name");
        var send_light = {};

        requested
            .get({url: req.gw_ip + 'lights', qs: '', json: true},function(err, res, body) {
                response.body = lights;
                if(response.statusCode == 200){
                    if(state == "on") {
                        lights[0].state.on = true;
                    }
                    else if(state == "off"){
                        lights[0].state.on = false;
                    }


                    requested
                        .post({url: req.gw_ip + 'updateLight', form: JSON.stringify(lights[0]), json: true},function(err, res, body) {
                            if(response.statusCode == 200){
                                console.log("I'm working");
                                response.say("The light  "+ name + "is " + state);
                            }// 200
                            else{
                                res.json({msg:'me conecto pero sin fallo'});
                            }
                            console.log(response.headers['content-type']); // 'image/png'
                        });
                }// 200
                else{
                    res.json({msg:'me conecto pero sin fallo'});
                }// 'image/png'

            });
    }
);


alexa.intent('MyLightIsIntent',
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
    console.log(JSON.stringify(req.body));
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
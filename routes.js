var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var requested = require('request');
var qs = require('querystring');
var alexa_app = require('alexa-app');
var alexa = new alexa_app.app('test');
var smartplugStatus = require('./smartplugStatus.json');
var ifttt = require('./lib/ifttp');
var fs = require('fs');

var state = "tvOff";
var prevState = "tvOff";

 alexa.messages.NO_INTENT_FOUND = "Sorry, can you repeat?";

 alexa.launch(function(request,response) {
	console.log("launching alexa\n");
	response.say("Hello, welcome to Telefonica's assistance services.");
	response.say("What can I do for you?");
	response.shouldEndSession(false);
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
 });

 alexa.intent('UpdateIntent',
     {
     },
	function(request,response) {
		console.log('Estoy en UPDATE INTENT');
		if(prevState!="tvOff"){
			prevState=state;
			state="tvLastEvents";
		}
		else{
			prevState=state;
			state="updateUser";
		}
	/*
        response.say("Your door has been opened twice from the time you went to work.");
        response.say(". . There has been an accident in the subway and all trains are delayed twenty minutes.");
        response.say(". . And your door sensor is running out of battery.");
        response.say(". . You can seen this and more in your TV.");
	response.say("Do you need anything else?");
	*/
	response.say("Yesterday while you weren't at home a new video was recorded.");
	response.say(". . Today your door sensor is running out of battery and you should leave early because there has been an accident in the subway and all trains are delayed twenty minutes.");
	response.say(". . You can seen this and more in your TV.");
	response.say("Do you need anything else?");
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
	response.shouldEndSession(false);
	}
 );

 alexa.intent('TurnOnTVIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en status INTENT');
		prevState=state;
		state="tvTurningOn";
		response.say("Ok, now your TV is ON.");
		response.say("What do you want to do next?");
		response.reprompt("Sorry, I didn't catch that. Could you repeat?");
		response.shouldEndSession(false);
     }
 );

 alexa.intent('TurnOffTVIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en status INTENT');
	prevState=state;
	state="tvTurningOff";
	response.say("Ok, I've turned off your TV.");
	response.say("Do you need anything else?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('StatusIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en status INTENT');
	prevState=state;
	state="tvMainPage";
	response.say("Ok. Now you can see the state of your home on you TV.");
	response.say("Do you need anything else?");
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('LastVideosIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en last videos INTENT');
	prevState=state;
	state="tvLastVideos";
        response.say("Here you have your last videos.");
	response.say("Do you need anything else?");
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('LastEventsIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en last events INTENT');
	prevState=state;
	state="tvLastEvents";
        response.say("Here you have your last events.");
        response.say("Your door has been opened twice from the time you went to work.");
        response.say(". . There has been an accident in Cercanias trains and all trains are delayed twenty minutes.");
        response.say(". . And your door sensor is running out of battery.");
	response.say("Do you need anything else?");
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('DevicesStatusIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en devices status INTENT');
	prevState=state;
	state="tvDevices";
        response.say("Here you can see the state of your devices.");
        response.say("Your door sensor is running out of battery.");
	response.say("Do you need anything else?");
	response.reprompt("Sorry, I didn't catch that. Could you repeat?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('PlayIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en devices status INTENT');
	prevState=state;
	state="tvPlayVideo";
        response.say("Playing yesterday's video.");
	response.shouldEndSession(true);
     }
 );

 alexa.intent('EndIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en devices status INTENT');
        response.say("I hope I have helped you. Bye!");
	response.shouldEndSession(true);
     }
 );

 alexa.intent('YesIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en devices status INTENT');
        response.say("Ok, what else can I do for you?");
	response.shouldEndSession(false);
     }
 );

 alexa.intent('NoIntent',
     {
     },
     function(request,response) {
        console.log('Estoy en devices status INTENT');
        response.say("I hope I have helped you. Bye!");
		response.shouldEndSession(true);
     }
 );


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
         response.say("hahahahaha weeeeeeeee");
     }
 );

 //ifttt();


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

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


router.post('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/tvAlexa', function(req, res, next) {
    console.log("Apagando la TV");
    state = "tvOff";
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tv.html'));
});

router.get('/updateState', function(req, res, next) {
	console.log("updateState");
	console.log("prevState: " + prevState + " state: " + state);
	if(state != prevState){
		prevState=state;
		console.log("updateState: turning On...");
		res.status(200).send(state);
		//res.sendFile(path.join(__dirname+'/frontend/views/' + state + '.html'));
	}
	else {
		console.log("updateState: NOT turning ON...");
		res.status(200).send("nothingChanged");
	}
});

router.get('/tvOff', function(req, res, next) {
    state = "tvOff";
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvOff.html'));
});

router.get('/tvTurningOn', function(req, res, next) {
	/* Turns on TV and shows the main page 
	 */
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvTurningOn.html'));
});

router.get('/tvMainPage', function(req, res, next) {
	/* Shows the main page 
	 */
    state="tvMainPage";
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvMainPage.html'));
});

router.get('/updateUser', function(req, res, next) {
	/* Shows the main page 
	 */
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/updateUser.html'));
});

router.get('/tvPlayVideo', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvPlayVideo.html'));
});

router.get('/tvLastVideos', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvLastVideos.html'));
});

router.get('/tvLastEvents', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvLastEvents.html'));
});

router.get('/tvDevices', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname+'/frontend/views/tvDevices.html'));
});

router.get('/api/lights', function (req, res, next) {
    console.log('Hello world');
    res.json({status:'light_parsed'});
});

router.get('/location/out', function (req, res, next) {
    console.log("Out");
    var myJson = {light: false,state:true};
    fs.writeFile( "smartplugStatus.json", JSON.stringify( myJson ), "utf8", function () {
        res.json({status:'data_stored'});
    } );
});

router.get('/location/in', function (req, res, next) {
    console.log("In");
    var myJson = {light: true,state:true};
    fs.writeFile( "smartplugStatus.json", JSON.stringify( myJson ), "utf8", function () {
        res.json({status:'data_stored'});
    } );
});

router.get('/api/smartplug/status', function (req, res) {
	console.log("here");
smartplugStatus = fs.readFileSync("smartplugStatus.json");
//var smartplugStatus = require('./smartplugStatus.json');
smartplugStatus = JSON.parse(smartplugStatus);
console.log("smartplugStatus: " + smartplugStatus);
    if(smartplugStatus.state == true){
console.log("AQUI ESTA TRUE");
        var object_to_send = smartplugStatus;
        var object_to_write = {light: smartplugStatus.light, state:false};
        fs.writeFile( "smartplugStatus.json", JSON.stringify( object_to_write ), "utf8", function () {
            res.status(200).json(object_to_send);
        } );
    }
    else{
console.log("false");
        res.status(200).json(smartplugStatus);
    }
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
    //res.json(buildSpeechletResponse());
});

module.exports = router;

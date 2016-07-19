var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var request = require('request');
var qs = require('querystring');


/* GET home_page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/api/lights', function (req, res, next) {
    console.log('Hello world');
});

router.post('/api/alexa', function (req, res, next) {
    console.log("I'm a post function");
    console.log(req.body);
});

router.get('/api/alexa', function (req, res, next) {
    console.log("I'm a get function");
    res.json({msg: "I'm a get method"});
});

module.exports = router;
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

module.exports = router;
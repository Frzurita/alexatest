var apiKey = 'bpIRyWQGydFVUs0GZPkOD6';
var IFTTTMaker = require('iftttmaker')(apiKey);
var requested = require('request');

var request = {
	event: 'notify',
	values: {
		value1: 'hello',
		value2: 'world'
	}
};

module.exports = function () {
	requested
		.post({url: 'https://maker.ifttt.com/trigger/notify/with/key/bpIRyWQGydFVUs0GZPkOD6', form: {
			value1: 'hello',
			value2: 'world'
		}, json: true},function(err, res, body) {
			if (err) {
				console.log('The request could not be sent:', err);
			} else {
				console.log(body);
				console.log('Request was sent');
			}
		});
};
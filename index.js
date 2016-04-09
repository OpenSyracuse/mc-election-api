// Include required modules.
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');

// Port to listen on.
var port = process.argv[2] || 5000;

var url = 'http://www.monroecounty.gov/etc/voter/index.php'

// Set up Express app.
var app = express();
app.listen(port);

// Default route.
app.get('/', function(req, res) {

	// Query string parameters for polling place lookup.
	var house_num = req.query.house_num;
	var street_name = req.query.street_name;
	var zip = req.query.zip;

	// Form data to be used in lookup.
	var formData = {
		'v[lname]': '',
		'v[dobm]': 'MM',
		'v[dobd]': 'DD',
		'v[doby]': 'YYYY',
		'v[no]': house_num,
		'v[sname]': street_name,
		'v[zip]': zip,
		submit: 'Get Voter Info'
	}

	// Lookup voter address.
	request.post({url:url, form: formData}, function (error, response, body) {
		if(!error) {
			try {
				$=cheerio.load(body);
				var link = $('#maplinks a').attr('href');
				var address = decodeURIComponent(link.substring(link.indexOf('=')+1, link.length)).replace(/\+/g, ' ');
				if(req.query.callback) {
					res.json({fullAddress: address });
				}
				else {
					res.jsonp({fullAddress: address });
				}
			}
			catch(e) {
				console.log('Error: ' + e.message);
				res.status(500).json({error: 'An error occured. Please recheck the address.'});
			}
		}
		else {
			res.status(400).json({error: 'Unable to look up location for that address.'});
		}	
	});

});


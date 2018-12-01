// dependencies
const express = require("express"),
	  mongoose = require ("mongoose"),
	  fs = require('fs'),
	  request = require('request'),
	  cheerio = require('cheerio'),
	  // Validator = require('jsonschema').Validator,
      router = express.Router();
      // var v = new Validator();


router.get("/hotel-mongoose", function(req, res) {

	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/agoda';

    mongoose.connect(uristring, function (dberr, dbres) {
      if (dberr) {
    	  res.end('ERROR connecting to: ' + uristring + '. ' + dberr);
      }else{
	      res.end('Succeeded connected to: ' + uristring);
      }
    });

	// res.end('1');
})

router.get("/hotel-curl", function(req, res) {

    url = 'https://www.agoda.com/en-en/hotel-vila-lumbung/hotel/bali-id.html';

    request(url, function(error, response, html){
        if(!error){	
            let $ = cheerio.load(html);

            //content'nya diantara "var propertyPageParams = " dan "propertyPageParams.priceAlert"

			//var re = /.*[var+propertyPageParams+=+]\s+(.*)\s+[propertyPageParams.priceAlert].*/;
			//var wowjson = $('script[id="property-page-params-init"]').html().replace(re, "$1");
			
			var wowjson1 = $('script[id="property-page-params-init"]').html().split('propertyPageParams.priceAlert', 2);
			var wowjson2 = wowjson1[0].split('var propertyPageParams = ', 2);
			// var wowjson3 = wowjson2[1].split(':')

			var wowjson_ok = wowjson2[1].replace(/\s\s+/g, ' ').trim().replace(/([a-z]\w*)(\:|\s\:)\s/ig, function(m){ return '"'+ m.replace(/(\:|\s\:)/, '').trim() +'": ';});

			console.log(JSON.parse(wowjson_ok));

			fs.writeFile('wowjson_ok.json', wowjson_ok, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			  res.end();
			});	            
        } 
    })
});

router.get("/hotel-agoda-json", function(req, res) {

    var json = require('fs').readFileSync('wowjson_ok.json', 'utf8');
    var json2 = JSON.parse(json);
    console.log((json2));


	// require('./wow.js');

    // console.log(propertyPageParams);

    res.end();
});


// export router
module.exports = router;
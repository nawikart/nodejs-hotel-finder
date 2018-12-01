// dependencies
const express = require("express"),
	  url = require('url'),
      router = express.Router();


router.get("/cities", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			  db.collection("hotel_city").find({}).limit(16).sort({'count': -1}).toArray(function(err, result) {
			    if (err) throw err;
			    res.render('admin/hotel/cities', {output: result});
			    db.close();
			  });
	});    
});

router.get("/cities/resetdb", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  
	  if (err) throw err;

			  db.collection("hotel_city").remove({});

			  db.collection("hotel").aggregate([{$group:{"_id": "$city_id", city : {$first: '$city'}, country_id : { $first: '$country_id' }, country : { $first: '$country' }, countryisocode : { $first: '$countryisocode' }, count: {$sum: 1}
}}]).toArray(function(err, result) {
			    if (err) throw err;

			    let x = 0;
			    result.forEach(function(value, index){			    	
			    	result[index].countrykey = value.country.toLowerCase().replace(/[^a-z0-9]/gi,'-').replace(/--*/g,'-').replace(/-*$/g,'');
			    	result[index].citykey = value.city.toLowerCase().replace(/[^a-z0-9]/gi,'-').replace(/--*/g,'-').replace(/-*$/g,''); //kalau error, update dulu city name di table hotel dari NaN --> 'NaN' supaya jadi string
			    });

				db.collection("hotel_city").insert(result);

			    res.render('admin/hotel/cities', {output: result});
			    db.close();
			  });
	});
});

router.get("/cities-countryisocode-to-lower", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			db.collection('hotel_city').find({countryisocode_lower: {"$exists" : false}}).limit(100000).forEach(
			  function(e) {
			    db.collection('hotel_city').update({_id: e._id}, {$set: {countryisocode_lower: e.countryisocode.toLowerCase() } })
			  }
			);
			res.end('finish');
	});
});

// export router
module.exports = router;
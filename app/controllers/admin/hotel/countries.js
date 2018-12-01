// dependencies
const express = require("express"),
	  url = require('url'),
      router = express.Router();


router.get("/countries", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			  db.collection("hotel_country").find({}).limit(16).sort({'count': -1}).toArray(function(err, result) {
			    if (err) throw err;

			    res.render('admin/hotel/countries', {output: result});
			    db.close();
			  }); 
	});    
});
	
router.get("/countries/resetdb", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  
	  if (err) throw err;

			  db.collection("hotel_country").remove({});

			  db.collection("hotel").aggregate([/*{ $limit : 25 }, */{ $sort : { 'country' : -1}}, {$group:{"_id": "$country_id", country : { $first: '$country' }, countryisocode : { $first: '$countryisocode' }, count: {$sum: 1}
}}]).toArray(function(err, result) {
			    if (err) throw err;

			    result.forEach(function(value, index){			    	
			    	result[index].countrykey = value.country.toLowerCase().replace(/[^a-z0-9]/gi,'-').replace(/--*/g,'-').replace(/-*$/g,'');
			    });

				db.collection("hotel_country").insert(result);

			    res.render('admin/hotel/countries', {output: result});
			    db.close();
			  });		
	});    
});

// export router
module.exports = router;
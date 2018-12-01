// dependencies
const express = require("express"),
    router = express.Router();

router.get(['/', "/:countrykey.htm"], function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/test";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = {};		
	  db.collection("countries_finish").find(query).sort({ count:-1 }).limit(16).toArray(function(err, result) {
	    if (err) throw err;
	    let countries = result;

			  db.collection("hotels_city").find((req.params.countrykey == '' || req.params.countrykey == undefined) ? {} : {countrykey: req.params.countrykey}).sort({ count:-1 }).limit(16).toArray(function(err, result) {
			    if (err) throw err;
			    res.render('hotel/home', {cities: result, countries: countries});
			    db.close();
			  });
	  });
	});    
});

// export router
module.exports = router;
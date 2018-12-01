// dependencies
const express = require("express"),
    router = express.Router();

router.get("/:hotel_namekey/hotel/:cityncountrycode.html", function(req, res) {

	console.log(req.params.hotel_namekey);

	let citykey = req.params.cityncountrycode.toLowerCase().replace(/[-][a-z][a-z]$/g,'');
	console.log(citykey);

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/agoda";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { hotel_namekey: req.params.hotel_namekey, citykey: citykey };
	  db.collection("hotel").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    // console.log(result);
	    res.render('hotel/hotel', {output: result});
	    db.close();
	  });
	});    
});

// export router
module.exports = router;
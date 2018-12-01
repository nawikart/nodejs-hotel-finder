// dependencies
const express = require("express"),
    router = express.Router();

router.get('/autocomplete/:keyword', function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/agoda";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;

	  let query = { city: req.params.keyword };
	  db.collection("hotel_city").find(query).limit(10).toArray(function(err, result) {
	    if (err) throw err;

	    console.log(result);
	    res.end(JSON.stringify(result));
	    db.close();
	  });
	});    
});

// export router
module.exports = router;
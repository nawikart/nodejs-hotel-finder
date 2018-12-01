// dependencies
const express = require("express"),
	  url = require('url'),
      router = express.Router();


router.get("/areas", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			  db.collection("hotel").aggregate([{$group:{"_id": "$country_id"}}]).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    res.render('admin/hotel/areas', {output: result});
			    db.close();
			  }); 
	});    
});

// export router
module.exports = router;
// dependencies
const express = require("express"),
    router = express.Router();

router.get("/", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/agoda";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { city: 'Bali' }; //req.params.city
	  db.collection("hotel").find(query).limit(20).toArray(function(err, result) {
	    if (err) throw err;
	    // console.log(result);
	    res.render('admin/home', {output: result});
	    db.close();
	  });
	});    
});

// export router
module.exports = router;
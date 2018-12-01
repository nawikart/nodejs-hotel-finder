// dependencies
const express = require("express"),
    router = express.Router();

router.get(['/:cityncountrycode-hotels.html', '/:cityncountrycode-hotels-page:p.html'], function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/test";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;

	  let city = req.params.cityncountrycode.toLowerCase().replace(/[-][a-z][a-z]$/g,'');
	  console.log(city);
  	  
  	  var perpage = 20;

	  if(req.params.p == '' || req.params.p == undefined){
	  	var skip = 0;
	  }else{
	  	var p = req.params.p;
  		var skip = (p-1) * perpage;
	  }
	  console.log(p);

	  let query = { citykey: city };
	  db.collection("hotels_rank").find(query).limit(perpage).skip(skip).toArray(function(err, result) {
	    if (err) throw err;
	    res.render('hotel/hotels', {output: result});
	    db.close();
	  });
	});    
});

// export router
module.exports = router;
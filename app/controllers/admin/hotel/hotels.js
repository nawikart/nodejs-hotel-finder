// dependencies
const express = require("express"),
	  url = require('url'),
      router = express.Router();


router.get("/konten", function(req, res) {
	res.render('admin/hotel/content', {output: false});
})

router.get(["/hotels", "/hotels/:key"], function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";

	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

		  	let q = url.parse(req.url, true);
		  	let perpage = 8;
		  	let p = q.query.p;
		  	let skip = (p-1) * perpage;
		  	let paging = {
		  		start: 1,
		  		a:[
		  			{no: 1, href: '/admiin/hotel-list?p=1'},
		  			{no: 2, href: '/admiin/hotel-list?p=2'},
		  			{no: 3, href: '/admiin/hotel-list?p=3'},
		  			{no: 4, href: '/admiin/hotel-list?p=4'},
		  			{no: 5, href: '/admiin/hotel-list?p=5'},
		  			{no: 6, href: '/admiin/hotel-list?p=6'},
		  			{no: 7, href: '/admiin/hotel-list?p=7'}]
		  	}

		  	  let query = {};		  	  

		  	  if(req.params.key == '' || req.params.key == undefined){
		  	  }else if(req.params.key == 'nocitykey'){
		  	  	query.citykey = {"$exists" : false};
		  	  }else if(req.params.key == 'nocountrykey'){
		  	  	query.countrykey = {"$exists" : false};
		  	  }


		  	  if(q.query.country == '' || q.query.country == undefined){
		  	  }else{
		  	  	query.country = q.query.country;
		  	  }
		  	  if(q.query.city  == '' || q.query.city == undefined){
		  	  }else{
		  	  	query.city = q.query.city;
		  	  }

		  	  console.log(query);

			  db.collection("hotel").find(query).limit(perpage).skip(skip).toArray(function(err, result) {
			    if (err) throw err;
			    // console.log(result);
			    res.render('admin/hotel/hotels', {output: result, paging: paging});
			    db.close();
			  }); 
	});    
});

router.get("/hotel-citykey-update", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

	  		  //db.collection("hotel").aggregate([{$match:{citykey: {"$exists" : false}},},{$limit: 5},{$lookup:{from: "hotel_city",localField: "city_id",foreignField: "_id",as: "hotel_city"},}]).toArray(function(err, result){

			  db.collection("hotel").aggregate([
				    
				    {
				      $match:
				        {
				          citykey: {"$exists" : false}
				        },
				    }, 
				    
				    {$limit: 50000},
				    
				    {				      
				      $lookup:
				        {
				          from: "hotel_city",
				          localField: "city_id",
				          foreignField: "_id",
				          as: "hotel_city"
				        },				        
				   }

			  ]).toArray(function(err, result) {

			    if (err) throw err;
			    
			    result.forEach(function(value, index){			    	

			    		// console.log(value.hotel_city[0].citykey);

						db.collection("hotel").update({ _id: value._id }, {
						    $set: {
						        "citykey": value.hotel_city[0].citykey,
						    }
						});
						res.end('finish');
			    });

			    // db.close();
			  });
	});    
});

router.get("/hotel-countrykey-update", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

	  		  //db.collection("hotel").aggregate([{$match:{citykey: {"$exists" : false}},},{$limit: 5},{$lookup:{from: "hotel_city",localField: "city_id",foreignField: "_id",as: "hotel_city"},}]).toArray(function(err, result){

			  db.collection("hotel").aggregate([
				    
				    {
				      $match:
				        {
				          citykey: {"$exists" : false}
				        },
				    }, 
				    
				    {$limit: 50000},
				    
				    {				      
				      $lookup:
				        {
				          from: "hotel_city",
				          localField: "city_id",
				          foreignField: "_id",
				          as: "hotel_city"
				        },				        
				   }

			  ]).toArray(function(err, result) {

			    if (err) throw err;
			    
			    result.forEach(function(value, index){			    	

			    		// console.log(value.hotel_city[0].citykey);

						db.collection("hotel").update({ _id: value._id }, {
						    $set: {
						        "citykey": value.hotel_city[0].citykey,
						    }
						});
						res.end('finish');
			    });

			    // db.close();
			  });
	});    
});

router.get("/hotel-countrykey-update", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

	  		  //db.collection("hotel").aggregate([{$match:{citykey: {"$exists" : false}},},{$limit: 5},{$lookup:{from: "hotel_city",localField: "city_id",foreignField: "_id",as: "hotel_city"},}]).toArray(function(err, result){

			  db.collection("hotel").aggregate([
				    
				    {
				      $match:
				        {
				          citykey: {"$exists" : false}
				        },
				    }, 
				    
				    {$limit: 50000},
				    
				    {				      
				      $lookup:
				        {
				          from: "hotel_city",
				          localField: "city_id",
				          foreignField: "_id",
				          as: "hotel_city"
				        },				        
				   }

			  ]).toArray(function(err, result) {

			    if (err) throw err;
			    
			    result.forEach(function(value, index){			    	

			    		// console.log(value.hotel_city[0].citykey);

						db.collection("hotel").update({ _id: value._id }, {
						    $set: {
						        "citykey": value.hotel_city[0].citykey,
						    }
						});
						res.end('finish');
			    });

			    // db.close();
			  });
	});    
});

router.get("/hotel-countryisocode-to-lower", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			db.collection('hotel').find({countryisocode_lower: {"$exists" : false}}).limit(100000).forEach(
			  function(e) {
			    db.collection('hotel').update({_id: e._id}, {$set: {countryisocode_lower: e.countryisocode.toLowerCase() } })
			  }
			);
			res.end('finish');
	});
});

router.get("/hotel-namekey-update", function(req, res) {

	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/agoda";
 
	MongoClient.connect(mongoUrl, function(err, db) {
	  if (err) throw err;

			db.collection('hotel').find({hotel_namekey: {"$exists" : false}}).limit(100000).forEach(
			  function(e) {
			  	if(typeof e.hotel_name == 'string'){
			  		db.collection('hotel').update({_id: e._id}, {$set: {hotel_namekey: e.hotel_name.toLowerCase().replace(/[^a-z0-9]/gi,'-').replace(/--*/g,'-').replace(/-*$/g,'') } })
			  	}	
			  }
			);
			res.end('finish');
	});    
});

// export router
module.exports = router;
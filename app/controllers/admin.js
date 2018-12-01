// dependencies
const express = require("express"),
	hbs = require('hbs'),
	fs = require('fs'),
    router = express.Router();

let adminPartialsDir = __dirname + '/../views/admin/partials';
let adminFilenames = fs.readdirSync(adminPartialsDir);
adminFilenames.forEach(function (filename) { 
  let matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  let name = matches[1];
  let template = fs.readFileSync(adminPartialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});
 
// routes
let hotelListController = require("./admin/hotel/hotels");
let hotelCountriesController = require("./admin/hotel/countries");
let hotelCitiesController = require("./admin/hotel/cities");
let hotelAreasController = require("./admin/hotel/areas");
let hotelCurlController = require("./admin/hotel/curl");
let homeController = require("./admin/home");

// router config
router.use("/admiin", hotelListController);
router.use("/admiin", hotelCountriesController);
router.use("/admiin", hotelCitiesController);
router.use("/admiin", hotelAreasController);
router.use("/admiin", hotelCurlController );
router.use("/admiin", homeController);

// export router
module.exports = router;  
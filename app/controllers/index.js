// dependencies
const express = require("express"),
    router = express.Router();

// routes
let homeController = require("./hotel/home");
let hotelsController = require("./hotel/hotels");
let hotelController = require("./hotel/hotel");
let apiAutocompleteController = require("./api/autocomplete");

// router config
router.use("/", homeController);
router.use("/", hotelsController);
router.use("/", hotelController);
router.use("/api", apiAutocompleteController);

// export router
module.exports = router;
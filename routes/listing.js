const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index and create route
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing, // middleware
  wrapAsync(listingController.createListing)
);



// Add the search route
router.get("/search", wrapAsync(listingController.searchListings));


//newRoute
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show, update and delete route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//editRoute
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

//indexRoute
// router.get("/", wrapAsync(listingController.index));  //shifted to router.route

// // showRoute
// router.get("/:id", wrapAsync(listingController.showListing)); //shifted to router.route

// // createRoute
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing, // middleware
//   wrapAsync(listingController.createListing)
// ); ////shifted to router.route

// //updateRoutre
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// ); ////shifted to router.route

////deleteRoute
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// ); ////shifted to router.route

const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const rideValidation = require("../validations/rideValidation");
const authJwt = require("../middlewares/authJwt");

// Create a new ride
router.post("/", authJwt.verifyToken, rideValidation.validateCreateRide, rideValidation.handleValidationErrors, rideController.createRide);

// Update a ride
router.put("/:id", authJwt.verifyToken, rideValidation.validateUpdateRide, rideValidation.handleValidationErrors, rideController.updateRide);

// Delete a ride
router.delete("/:id", authJwt.verifyToken, rideController.deleteRide);

// Complete a ride
router.put("/:id/complete", authJwt.verifyToken, rideController.completeRide);

// Get a single ride
router.get("/:id", authJwt.verifyToken, rideController.getRide);

// Get all rides
router.get("/", authJwt.verifyToken, rideController.getAllRides);

// Duplicate a ride
router.post("/:id/duplicate", authJwt.verifyToken, rideController.duplicateRide);

module.exports = router;
